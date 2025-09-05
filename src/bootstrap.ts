import { init } from '@module-federation/runtime/.';
import { createViteAppWebComponent } from '@onecx/react-webcomponents';
import { APP_NAME } from './onecxIntegration/utils/globals';
import App from './App';

init({
  name: APP_NAME,
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

createViteAppWebComponent(App, `${APP_NAME}-entrypoint`);
