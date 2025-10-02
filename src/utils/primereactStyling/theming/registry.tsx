import { ReactNode, useState, useLayoutEffect } from 'react';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import { PrimeReactProvider } from 'primereact/api';
import applyThemeVariables from './applyThemeVariables';

type Props = Readonly<{
  children?: ReactNode;
}>;

export default function StyleRegistry({ children }: Props) {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const themeSubscription = new CurrentThemeTopic().subscribe((theme) => {
      console.log('THEME_UPDATE:', theme);
      applyThemeVariables(theme);
      setIsReady(true);
    });

    const fallbackTimer = setTimeout(() => {
      console.warn(
        'No theme received within 50ms, showing content with defaults',
      );
      setIsReady(true);
    }, 50);

    return () => {
      clearTimeout(fallbackTimer);
      themeSubscription.unsubscribe();
    };
  }, []);

  if (!isReady) {
    return null; // Can be spinner or skeleton here
  }

  return (
    <PrimeReactProvider
      value={{
        unstyled: false,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
