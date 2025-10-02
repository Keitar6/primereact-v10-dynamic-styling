import { ComponentType } from 'react';
import { PrimeReactStyleProvider } from '../../contexts/app';
import { APP_NAME, PRODUCT_NAME } from '../../../constants/globals';

const appId = `${PRODUCT_NAME}|${APP_NAME}`;

export function withAppPrimereactStylesIsolation<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <PrimeReactStyleProvider appId={appId}>
      <RemoteComponent {...props} />
    </PrimeReactStyleProvider>
  );
}
