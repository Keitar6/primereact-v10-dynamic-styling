import { type PrimeReactScoperOptions } from './utils/types';
import {
  normalizeForHash,
  hash,
  getStyleFromNode,
  shouldInclude,
  scopeCss,
} from './utils/helpers';

/**
 * Attaches a per-app MutationObserver that writes scoped copies of
 * PrimeReact style blocks to a dedicated <style data-app-primereact-style="...">.
 * It NEVER edits PrimeReact’s own style tags.
 *
 * Returns a disposer to disconnect the observer (it does not remove the app style tag).
 */
export function attachPrimeReactScoper({
  id,
  scopeRootSelector,
  scopeLimitSelector = '[data-style-isolation]',
  target = document.head,
  bootstrapExisting = true,
  captureWindowMs = Number.POSITIVE_INFINITY,
  freezeAfterFirstUpdate = false,
  mode = 'replace-per-styleId',
  prefixFilter,
  alwaysIncludeStyleIds = ['base', 'global', 'common'],
  normalizeBeforeHash = true,
  blockFurtherUpdatesForCapturedIds = false,
  dataPrimereactStyleName = 'app',
}: PrimeReactScoperOptions) {
  const styleTag = document.createElement('style');
  styleTag.setAttribute('type', 'text/css');
  styleTag.setAttribute(`data-${dataPrimereactStyleName}-primereact-style`, id);
  target.appendChild(styleTag);

  const start = performance.now();

  const lastHashById = new Map<string, string>();
  const chunkById = new Map<string, Text>();
  const capturedIds = new Set<string>();

  const inCaptureWindow = () => performance.now() - start <= captureWindowMs;

  let didUpdateOnce = false;

  const writeChunk = (styleId: string, scopedCss: string) => {
    const banner = `/* ==== app:${id} | primereact:${styleId} ==== */\n`;
    if (mode === 'replace-per-styleId') {
      const existing = chunkById.get(styleId);
      if (existing) {
        existing.textContent = banner + scopedCss;
      } else {
        const tn = document.createTextNode(banner + scopedCss);
        styleTag.appendChild(tn);
        chunkById.set(styleId, tn);
      }
    } else {
      const tn = document.createTextNode(banner + scopedCss);
      styleTag.appendChild(tn);
    }

    capturedIds.add(styleId);

    if (!didUpdateOnce && freezeAfterFirstUpdate) {
      didUpdateOnce = true;
      observer.disconnect();
    }
  };

  const upsertScopedBlock = (styleId: string, rawCss: string) => {
    if (!rawCss) return;
    if (blockFurtherUpdatesForCapturedIds && capturedIds.has(styleId)) return;
    if (!inCaptureWindow()) return;

    const normalized = normalizeForHash(rawCss, normalizeBeforeHash);
    const h = hash(normalized);

    if (lastHashById.get(styleId) === h) return;
    if (!shouldInclude(styleId, rawCss, alwaysIncludeStyleIds, prefixFilter))
      return;

    const scoped = scopeCss(rawCss, scopeRootSelector, scopeLimitSelector);
    writeChunk(styleId, scoped);
    lastHashById.set(styleId, h);
  };

  const processStyleElement = (styleEl: HTMLStyleElement) => {
    const styleId =
      styleEl.getAttribute('data-primereact-style-id') ||
      styleEl.id ||
      'unknown';
    upsertScopedBlock(styleId, styleEl.textContent || '');
  };

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'childList') {
        record.addedNodes.forEach((node) => {
          const style = getStyleFromNode(node);
          if (style) processStyleElement(style);
        });
      } else if (record.type === 'characterData') {
        const style = getStyleFromNode(record.target);
        if (style) processStyleElement(style);
      }
    }
  });

  observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  if (bootstrapExisting) {
    document.head
      .querySelectorAll(
        'style[data-primereact-style-id], style[id^="primereact_"]'
      )
      .forEach((el) => processStyleElement(el as HTMLStyleElement));
  }

  return () => {
    observer.disconnect();
  };
}
