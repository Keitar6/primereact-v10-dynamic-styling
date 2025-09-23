import { PRODUCT_NAME } from '../../onecxIntegration/utils/globals';
import customPreset from './preset/custom-preset';
import type { AppConfig } from './types/app.types';

const appConfig: AppConfig = {
  preset: 'Aura',
  primary: 'customPreset',
  isDarkTheme: false,
  isNewsActive: false,
  isRTL: false,
  storageKey: 'primereact',
  versions: [
    {
      name: 'v11',
      url: 'https://primereact.org',
    },
  ],
  primereact: {
    theme: {
      preset: customPreset,
      options: {
        prefix: PRODUCT_NAME, // This changes --p-primary-color to --vite-example-primary-color
        // cssLayer: {
        //   name: `${PRODUCT_NAME}-primereact`,
        //   order: 'theme, base, primereact',
        // },
        darkModeSelector: '.p-dark',
      },
    },
  },
};

export default appConfig;
