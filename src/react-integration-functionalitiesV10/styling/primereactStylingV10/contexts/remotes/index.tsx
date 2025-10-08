import {
  createContext,
  useEffect,
  useRef,
  ReactNode,
  useState,
  RefObject,
} from 'react';
import { attachPrimeReactScoper } from '../../scopingFunctionality';

interface PrimeReactStyleProviderProps {
  remoteId: string;
  children: ReactNode;
}

const PrimeReactStyleContext = createContext<
  { rootRef: RefObject<HTMLDivElement> } | undefined
>(undefined);

export const PrimeReactStyleProvider = ({
  remoteId,
  children,
}: PrimeReactStyleProviderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isScoped, setIsScoped] = useState(false);

  useEffect(() => {
    const detach = attachPrimeReactScoper({
      id: remoteId,
      scopeRootSelector: `[data-style-id="${remoteId}"]`,
      bootstrapExisting: true,
      blockFurtherUpdatesForCapturedIds: true,
      dataPrimereactStyleName: 'remote',
      freezeAfterFirstUpdate: true,
    });
    setIsScoped(true);
    return () => detach();
  }, [remoteId]);

  if (!isScoped) return null; // spinner or smthing

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
