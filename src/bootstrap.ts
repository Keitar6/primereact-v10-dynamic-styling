import { init } from '@module-federation/runtime/.';
import { createViteAppWebComponent } from '@onecx/react-webcomponents';
import { APP_GLOBALS } from './utils/constants/globals';
import App from './App';

init({
  name: APP_GLOBALS.APP_NAME,
  remotes: [],
  shared: {
    react: {},
    'react-dom': {},
    'react-router-dom': {},
    rxjs: {},
    '@module-federation/vite': {},
    '@module-federation/enhanced': {},
    '@module-federation/runtime': {},
    '@module-federation/runtime-core': {},
    '@onecx/accelerator': {},
    '@onecx/integration-interface': {},
  },
});

createViteAppWebComponent(App, `${APP_GLOBALS.APP_NAME}-entrypoint`);
