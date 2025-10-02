import { ReactNode, useEffect, useState } from 'react';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import { PrimeReactProvider } from 'primereact/api';
import applyThemeVariables from './applyThemeVariables';

type Props = Readonly<{
  children?: ReactNode;
}>;

export default function StyleRegistry({ children }: Props) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const themeSubscription = new CurrentThemeTopic().subscribe((theme) => {
      console.log('CURRENT_THEME:', theme);
      applyThemeVariables(theme);
      setIsThemeLoaded(true);
    });

    return () => {
      themeSubscription.unsubscribe();
    };
  }, []);

  // Waiting for a theme to be loaded
  return (
    <div
      style={{
        visibility: !isThemeLoaded ? 'hidden' : 'initial',
      }}
    >
      <PrimeReactProvider
        value={{
          unstyled: false,
        }}
      >
        {children}
      </PrimeReactProvider>
    </div>
  );
}
