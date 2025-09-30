import { ReactNode, useEffect } from 'react';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import { PrimeReactProvider } from 'primereact/api';

type Props = Readonly<{
  children?: ReactNode;
}>;

export default function StyleRegistry({ children }: Props) {
  useEffect(() => {
    const ThemeTopic = new CurrentThemeTopic().subscribe((crrTheme) => {
      return crrTheme;
    });
    return () => {
      ThemeTopic.unsubscribe();
    };
  }, []);

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
