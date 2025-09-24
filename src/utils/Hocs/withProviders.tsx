import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';
// import { PrimeReactProvider } from '';
// import { PrimeReactProvider } from '@primereact/core';
// import { PrimeReactStyleSheet } from '@primereact/core/stylesheet';
// import appConfig from '../themes/app.config';
import { PrimeReactProvider } from 'primereact/api';

// const styledStyleSheet = new PrimeReactStyleSheet();

export function withProviders<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <AppStateProvider>
      <ConfigurationProvider>
        <PrimeReactProvider value={{ unstyled: false }}>
          {/* <PrimeReactProvider
          // {...appConfig.primereact}
          // stylesheet={styledStyleSheet}
          value={{
            unstyled: false,
            }}
            > */}
          <RemoteComponent {...props} />
          {/* </PrimeReactProvider> */}
        </PrimeReactProvider>
      </ConfigurationProvider>
    </AppStateProvider>
  );
}
