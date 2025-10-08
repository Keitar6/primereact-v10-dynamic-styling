import { ComponentType } from 'react';
import {
  AppStateProvider,
  ConfigurationProvider,
} from '@onecx/react-integration-interface';
import { SyncedRouterProvider } from '../routing';
import '../styling/primereactStylingV10/dynamicScoping';

export function withBaseProviders<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <SyncedRouterProvider>
      <AppStateProvider>
        <ConfigurationProvider>
          <Component {...props} />
        </ConfigurationProvider>
      </AppStateProvider>
    </SyncedRouterProvider>
  );
}
