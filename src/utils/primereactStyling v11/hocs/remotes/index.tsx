import { ComponentType } from 'react';
import { PrimeReactStyleProvider } from '../../contexts/remotes';
import { PRODUCT_NAME } from '../../../constants/globals';

const remoteName = 'test-remote';
const remoteId = `${PRODUCT_NAME}|${remoteName}`;

export function withRemotesPrimereactStylesIsolation<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <PrimeReactStyleProvider remoteId={remoteId}>
      <RemoteComponent {...props} />
    </PrimeReactStyleProvider>
  );
}
