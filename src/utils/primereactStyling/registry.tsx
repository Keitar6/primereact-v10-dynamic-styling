import { ReactNode, useEffect } from 'react';
import { CurrentThemeTopic } from '@onecx/integration-interface';
import { PrimeReactProvider } from 'primereact/api';
import { APP_NAME, PRODUCT_NAME } from '../../onecxIntegration/utils/globals';

type Props = Readonly<{
  children?: ReactNode;
}>;

// Theme variable mapping function
function mapThemeToCSS(
  themeProperties: Record<string, any>,
): Record<string, string> {
  const variableMap: Record<string, string> = {
    primaryColor: '--test-example-primary-color',
    textColor: '--test-example-text-color',
    backgroundColor: '--test-example-surface-0',
    hoverBgColor: '--test-example-onecx-hover-bg-color',
    buttonHoverBg: '--test-example-onecx-button-hover-bg',
    buttonActiveBg: '--test-example-onecx-button-active-bg',
    errorColor: '--test-example-onecx-error-color',
    // Add more mappings based on your theme structure
  };

  return Object.entries(themeProperties).reduce(
    (acc, [key, value]) => {
      const cssVar =
        variableMap[key] ||
        `--test-example-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      acc[cssVar] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

// Override CSS variables in the scoped element
function applyThemeVariables(cssVariables: Record<string, string>) {
  const scopedElement = document.querySelector(
    `[data-style-id="${PRODUCT_NAME}|${APP_NAME}"]`,
  );

  if (scopedElement) {
    Object.entries(cssVariables).forEach(([cssVar, value]) => {
      (scopedElement as HTMLElement).style.setProperty(cssVar, value);
    });
  } else
    console.warn(
      `Styled for ${APP_NAME} element not found. Unable to apply theme variables directly.`,
    );
}

export default function StyleRegistry({ children }: Props) {
  useEffect(() => {
    const ThemeTopic = new CurrentThemeTopic().subscribe((crrTheme) => {
      console.log('THEME_TOPIC RENDER: ', crrTheme);

      // Map theme properties to CSS variables and apply them
      const cssVariables = mapThemeToCSS(crrTheme.properties as any);
      // applyThemeVariables(cssVariables);

      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA: ', cssVariables);
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBB: ', crrTheme);

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
