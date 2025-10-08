import { ComponentType } from 'react';
import { PrimeReactStyleProvider } from '../../contexts/remotes';
import { PRODUCT_NAME } from '../../../../../utils/constants/globals';

const remoteName = 'test-remote';
const remoteId = `${PRODUCT_NAME}|${remoteName}`;

export function withRemotesPrimereactStylesIsolation<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <PrimeReactStyleProvider remoteId={remoteId}>
      <Component {...props} />
    </PrimeReactStyleProvider>
  );
}
