import { ComponentType } from 'react';
import { withLocationMgmt } from '../general/withLocationMgmt';
import { withBaseProviders } from '../general/withBaseProviders';
import { withRemotesPrimereactStylesIsolation } from '../../primereactStyling/hocs/remotes';
import { composeProviders } from '../../globalFunctions/composeProviders';
import { withRemoteStyles } from './styles';

export const withRemote = <P extends object>(Component: ComponentType<P>) =>
  composeProviders<P>(
    withRemoteStyles,
    withRemotesPrimereactStylesIsolation,
    withBaseProviders,
    withLocationMgmt,
  )(Component);
