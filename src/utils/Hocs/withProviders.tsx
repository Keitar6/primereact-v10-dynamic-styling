import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';
import StyleRegistry from '../primereactStyling/registry';

export function withProviders<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <AppStateProvider>
      <ConfigurationProvider>
        <StyleRegistry>
          <RemoteComponent {...props} />
        </StyleRegistry>
      </ConfigurationProvider>
    </AppStateProvider>
  );
}
