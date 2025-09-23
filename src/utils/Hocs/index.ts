import { ComponentType } from 'react';
import { withLocationMgmt } from './withLocationMgmt';
import { withProviders } from './withProviders';
import { withRemotesPrimereactStylesIsolation } from '../primereactStyling/hocs/remotes';
import { withAppPrimereactStylesIsolation } from '../primereactStyling/hocs/app';

type HOC<InjectedProps, OriginalProps> = (
  component: ComponentType<OriginalProps & InjectedProps>,
) => ComponentType<OriginalProps>;

export const composeProviders = <P extends object>(
  ...providers: Array<HOC<any, P>>
): ((Component: ComponentType<P>) => ComponentType<P>) => {
  return (Component: ComponentType<P>) =>
    providers.reduceRight(
      (AccumulatedComponent, CurrentProvider) =>
        CurrentProvider(AccumulatedComponent),
      Component,
    );
};

const withRemote = <P extends object>(Component: ComponentType<P>) =>
  composeProviders<P>(
    withRemotesPrimereactStylesIsolation,
    withLocationMgmt,
    withProviders,
  )(Component);

const withApp = (Component: ComponentType) =>
  composeProviders(withAppPrimereactStylesIsolation, withProviders)(Component);

export { withRemote, withApp };
