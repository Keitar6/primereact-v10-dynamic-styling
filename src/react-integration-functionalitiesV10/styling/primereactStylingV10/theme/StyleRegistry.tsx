import { ReactNode, useState, useLayoutEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import applyThemeVariables from './applyThemeVariables';

type Props = Readonly<{
  children?: ReactNode;
  themeStyleId?: string;
}>;

export default function StyleRegistry({ children, themeStyleId }: Props) {
  const [isThemed, setIsThemed] = useState(false);

  useLayoutEffect(() => {
    const themeSubscription = new CurrentThemeTopic().subscribe((theme) => {
      console.log('THEME_UPDATE:', theme);
      applyThemeVariables(theme, themeStyleId);
      setIsThemed(true);
    });

    return () => {
      themeSubscription.unsubscribe();
    };
  }, []);

  if (!isThemed) {
    return null; // Can be spinner or skeleton here
  }

  return (
    <PrimeReactProvider
      value={{
        unstyled: false,
        appendTo: 'self',
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
