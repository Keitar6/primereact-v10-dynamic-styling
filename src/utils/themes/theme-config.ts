import {
  createPalette,
  standardColorAdjustment,
} from './functions/create-color-palette';
import { normalizeKeys } from './functions/normalize-preset-keys.utils';

interface ThemeVariables {
  [key: string]: {
    [key: string]: string;
  };
}

function getConfig(themeVariables: ThemeVariables) {
  const transformedThemeVariables = transformVariablesToCamelCase(
    themeVariables ?? {},
  );
  const primaryColor = (transformedThemeVariables as any)['general'][
    'primaryColor'
  ];
  return normalizeKeys({
    semantic: {
      extend: {
        onecx: {
          ...(transformedThemeVariables as any)['font'],
          ...(transformedThemeVariables as any)['topbar'],
          ...(transformedThemeVariables as any)['sidebar'],
          ...(transformedThemeVariables as any)['general'],
        },
      },
      primary: {
        ...createPalette(primaryColor, standardColorAdjustment),
      },
      colorScheme: {
        light: {
          primary: {
            ...createPalette(primaryColor, standardColorAdjustment),
          },
        },
      },
    },
  });
}

export function createAPresetBasedOnTheme(themeVariables: ThemeVariables) {
  return getConfig(themeVariables);
}

function transformVariablesToCamelCase(themeVariables: ThemeVariables) {
  const transformedThemeVariables: ThemeVariables = {};
  for (const section in themeVariables) {
    const sectionCamelCaseKey = toCamelCase(section);
    transformedThemeVariables[sectionCamelCaseKey] =
      transformSectionToCamelCase(themeVariables[sectionCamelCaseKey]);
  }
  return transformedThemeVariables;
}

function transformSectionToCamelCase(section: { [key: string]: string }): {
  [key: string]: string;
} {
  const transformedSectionThemeVariables: { [key: string]: string } = {};
  for (const themeVariable in section) {
    const themeVariableCamelCase = toCamelCase(themeVariable);
    transformedSectionThemeVariables[themeVariableCamelCase] =
      section[themeVariable];
  }
  return transformedSectionThemeVariables;
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}
