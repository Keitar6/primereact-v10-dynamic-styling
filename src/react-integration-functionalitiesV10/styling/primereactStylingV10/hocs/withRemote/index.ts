import { ComponentType } from 'react';
import { withBaseProviders } from '../../../../utils/withBaseProviders';
import { withRemotesPrimereactStylesIsolation } from '../withRemotesPrimereactStylesIsolation';
import { composeProviders } from '../../../../utils/composeProviders';
import { withRemoteStyles } from '../withRemoteStyles';

export const withRemote = <P extends object>(Component: ComponentType<P>) =>
  composeProviders<P>(
    withRemoteStyles,
    withRemotesPrimereactStylesIsolation,
    withBaseProviders,
  )(Component);
