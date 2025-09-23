import { createViteAppWebComponent } from '@onecx/react-webcomponents';
import Remote from './main';

(function bootstrapRemote() {
  createViteAppWebComponent(Remote, 'test-remote');
  return () => {};
})();
