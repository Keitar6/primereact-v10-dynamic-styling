// primereact-remote-style-mirror.ts
type Options = {
  /** The element that “owns” your remote (shadowRoot host or a wrapper div). */
  remoteRoot: Element | ShadowRoot;
  /** A selector that matches `remoteRoot` in the light DOM (e.g., [data-style-id="product|appA"]). */
  scopeRootSelector: string;
  /** Optional lower bound for donut scopes (e.g., [data-style-isolation]) */
  scopeLimitSelector?: string;
  /** Give the remote a stable id for debugging. */
  remoteId: string;
};

export function attachPrimeReactRemoteStyleMirror(opts: Options) {
  const { remoteRoot, scopeRootSelector, scopeLimitSelector, remoteId } = opts;

  // Our single, remote-owned <style> (one per app/remote).
  const styleEl = document.createElement('style');
  styleEl.setAttribute('type', 'text/css');
  styleEl.setAttribute('data-remote-primereact-style', remoteId);
  // Attach inside the remote; for shadow DOM, append to shadowRoot; otherwise, to the remote root element.
  (remoteRoot as Element).appendChild(styleEl);

  // Cache of last mirrored text per source style-id so we only recompute when needed.
  const lastById = new Map<string, string>();

  const isPRStyle = (el: Element) =>
    el.tagName === 'STYLE' &&
    (el.hasAttribute('data-primereact-style-id') ||
      el.id?.startsWith('primereact_'));

  // Wrap + transform: keep @layer primereact intact, scope the whole sheet, and localize tokens.
  const scopeCss = (css: string) => {
    const prelude = scopeLimitSelector
      ? `@scope(${scopeRootSelector}) to (${scopeLimitSelector})`
      : `@scope(${scopeRootSelector})`;
    // Replace :root → :scope *after* wrapping, so tokens become local to this remote.
    //@ts-ignore
    const body = css.replaceAll(':root', ':scope');
    return `${prelude}{\n${body}\n}`;
  };

  // Build the aggregated CSS for *all* PrimeReact style blocks we see.
  const rebuild = () => {
    // Read all current PR style blocks (base/global/common + any component ones).
    const sourceStyles = [
      //@ts-ignore
      ...document.head.querySelectorAll(
        'style[data-primereact-style-id], style[id^="primereact_"]',
      ),
    ];

    // Aggregate by preserving a deterministic order: base, global, common first, then others.
    const sorted = sourceStyles.sort((a, b) => {
      const aid = a.getAttribute('data-primereact-style-id') || a.id || '';
      const bid = b.getAttribute('data-primereact-style-id') || b.id || '';
      const order = ['base', 'global', 'common'];
      const ai = order.includes(aid) ? order.indexOf(aid) : order.length;
      const bi = order.includes(bid) ? order.indexOf(bid) : order.length;
      return ai - bi || aid.localeCompare(bid);
    });

    let combined = '';
    let changed = false;

    for (const src of sorted) {
      const id =
        src.getAttribute('data-primereact-style-id') || src.id || 'unknown';
      const raw = src.textContent || '';
      const prev = lastById.get(id);
      if (prev !== raw) changed = true;

      lastById.set(id, raw);
      if (!raw) continue;

      // Keep the original @layer primereact (don’t replace). Just wrap the whole block in @scope.
      const scoped = scopeCss(raw);

      combined += `/* ==== PrimeReact:${id} (remote:${remoteId}) ==== */\n${scoped}\n\n`;
    }

    if (changed || styleEl.textContent !== combined) {
      styleEl.textContent = combined;
    }
  };

  // Initial build
  rebuild();

  // Observe head for added/replaced PR style tags and for text changes.
  const mo = new MutationObserver((records) => {
    let needs = false;

    for (const r of records) {
      if (r.type === 'childList') {
        // New style nodes or removals
        r.addedNodes.forEach((n) => {
          if (n.nodeType === Node.ELEMENT_NODE && isPRStyle(n as Element))
            needs = true;
        });
        r.removedNodes.forEach((n) => {
          if (n.nodeType === Node.ELEMENT_NODE && isPRStyle(n as Element))
            needs = true;
        });
      } else if (r.type === 'characterData') {
        // Text mutation inside a PR style
        const parent = r.target.parentNode;
        if (
          parent &&
          parent.nodeType === Node.ELEMENT_NODE &&
          isPRStyle(parent as Element)
        )
          needs = true;
      }
    }

    if (needs) rebuild();
  });

  mo.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Optionally bootstrap existing textNode mutations by scanning once more after a tick
  queueMicrotask(rebuild);

  // Return a disposer
  return () => {
    mo.disconnect();
    styleEl.remove();
  };
}
