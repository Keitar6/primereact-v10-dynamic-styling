import { ComponentType } from 'react';
import { withLocationMgmt } from './withLocationMgmt';
import { withProviders } from './withProviders';
import { withRemotesPrimereactStylesIsolation } from '../primereactStyling/hocs/remotes';
import { composeProviders } from '../globalFunctions/composeProviders';

export const withRemote = <P extends object>(Component: ComponentType<P>) =>
  composeProviders<P>(
    withRemotesPrimereactStylesIsolation,
    withLocationMgmt,
    withProviders,
  )(Component);
