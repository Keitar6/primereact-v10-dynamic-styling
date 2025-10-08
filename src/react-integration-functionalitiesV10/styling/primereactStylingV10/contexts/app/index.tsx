import { createContext, useEffect, RefObject, useRef, ReactNode } from 'react';
import { attachPrimeReactScoper } from '../../scopingFunctionality';

interface PrimeReactStyleProviderProps {
  appId: string;
  children: ReactNode;
}

const PrimeReactStyleContext = createContext<
  { rootRef: RefObject<HTMLDivElement> } | undefined
>(undefined);

export const PrimeReactStyleProvider = ({
  appId,
  children,
}: PrimeReactStyleProviderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detach = attachPrimeReactScoper({
      id: appId,
      scopeRootSelector: `[data-style-id="${appId}"]`,
      bootstrapExisting: true,
      blockFurtherUpdatesForCapturedIds: true,
    });

    return () => detach();
  }, [appId]);

  return (
    <PrimeReactStyleContext.Provider value={{ rootRef }}>
      <div
        ref={rootRef}
        data-style-id={appId}
        data-style-isolation
        data-no-portal-layout-styles
        style={{ display: 'contents' }}
      >
        {children}
      </div>
    </PrimeReactStyleContext.Provider>
  );
};
