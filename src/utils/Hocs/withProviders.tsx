import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';
import { PrimeReactProvider } from 'primereact/api';

export function withProviders<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <AppStateProvider>
      <ConfigurationProvider>
        <PrimeReactProvider
          value={{
            unstyled: false,
          }}
        >
          <RemoteComponent {...props} />
        </PrimeReactProvider>
      </ConfigurationProvider>
    </AppStateProvider>
  );
}
