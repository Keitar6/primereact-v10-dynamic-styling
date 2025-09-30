import { ReactNode, useEffect, useState } from 'react';
import { merge } from 'lodash';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import { type PrimeReactProps } from '@primereact/types/core';
import { PrimeReactProvider } from '@primereact/core';
import { PrimeReactStyleSheet } from '@primereact/core/stylesheet';
import appConfig from '../themes/app.config';
import { createAPresetBasedOnTheme } from '../themes/theme-config';

const styledStyleSheet = new PrimeReactStyleSheet();

export default function StyleRegistry({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  const [currentPreset, setCurrentPreset] = useState<PrimeReactProps>(
    appConfig.primereact,
  );

  useEffect(() => {
    const ThemeTopic = new CurrentThemeTopic().subscribe((crrTheme) => {
      const preset = createAPresetBasedOnTheme(crrTheme.properties as any);
      setCurrentPreset((oldValue) => {
        const newValue = {
          ...oldValue,
          theme: {
            ...oldValue.theme,
            preset: merge(oldValue.theme?.preset ?? {}, preset),
          },
        };

        console.log('THEME_TOPIC RENDER: ', crrTheme);
        return newValue;
      });
      return crrTheme;
    });
    return () => {
      ThemeTopic.unsubscribe();
    };
  }, []);

  return (
    <PrimeReactProvider
      {...currentPreset}
      stylesheet={styledStyleSheet}
      value={{
        unstyled: false,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
