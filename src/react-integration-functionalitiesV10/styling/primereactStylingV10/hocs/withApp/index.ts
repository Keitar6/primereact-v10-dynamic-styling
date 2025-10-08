import { ComponentType } from 'react';
import { withBaseProviders } from '../../../../utils/withBaseProviders';
import { withAppPrimereactStylesIsolation } from '../withAppPrimereactStylesIsolation';
import { composeProviders } from '../../../../utils/composeProviders';
import { withAppStyles } from '../withAppStyles';

export const withApp = (Component: ComponentType) =>
  composeProviders(
    withAppPrimereactStylesIsolation,
    withAppStyles,
    withBaseProviders,
  )(Component);
