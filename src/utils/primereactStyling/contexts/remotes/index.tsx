import { createContext, useEffect, useRef, ReactNode } from 'react';
import { attachPrimeReactScoper } from '../../mutationObservers';

interface PrimeReactStyleProviderProps {
  remoteId: string;
  children: ReactNode;
}

const PrimeReactStyleContext = createContext<
  { rootRef: React.RefObject<HTMLDivElement> } | undefined
>(undefined);

export const PrimeReactStyleProvider = ({
  remoteId,
  children,
}: PrimeReactStyleProviderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detach = attachPrimeReactScoper({
      id: remoteId,
      scopeRootSelector: `[data-style-id="${remoteId}"]`,
      bootstrapExisting: true,
      blockFurtherUpdatesForCapturedIds: true,
      dataPrimereactStyleName: 'remote',
    });

    return () => detach();
  }, [remoteId]);

  return (
    <PrimeReactStyleContext.Provider value={{ rootRef }}>
      <div
        ref={rootRef}
        data-style-id={remoteId}
        data-style-isolation
        data-no-portal-layout-styles
        style={{ display: 'contents' }}
      >
        {children}
      </div>
    </PrimeReactStyleContext.Provider>
  );
};
