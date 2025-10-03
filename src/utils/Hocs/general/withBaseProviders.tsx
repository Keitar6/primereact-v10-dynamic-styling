import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';

export function withBaseProviders<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <AppStateProvider>
      <ConfigurationProvider>
        <RemoteComponent {...props} />
      </ConfigurationProvider>
    </AppStateProvider>
  );
}
