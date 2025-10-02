import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';
import StyleRegistry from '../primereactStyling/theming/registry';

export function withProviders<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <StyleRegistry>
      <AppStateProvider>
        <ConfigurationProvider>
          <RemoteComponent {...props} />
        </ConfigurationProvider>
      </AppStateProvider>
    </StyleRegistry>
  );
}
