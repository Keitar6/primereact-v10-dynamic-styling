import { ComponentType } from 'react';
import { PrimeReactStyleProvider } from '../../contexts/app';
import { PRODUCT_NAME } from '../../../../onecxIntegration/utils/globals';

const appName = 'test-main';
const appId = `${PRODUCT_NAME}|${appName}`;

export function withAppPrimereactStylesIsolation<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <PrimeReactStyleProvider appId={appId}>
      <RemoteComponent {...props} />
    </PrimeReactStyleProvider>
  );
}
