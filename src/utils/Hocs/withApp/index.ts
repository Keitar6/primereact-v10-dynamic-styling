import { ComponentType } from 'react';
import { withBaseProviders } from '../general/withBaseProviders';
import { withAppPrimereactStylesIsolation } from '../../primereactStyling/hocs/app';
import { composeProviders } from '../../globalFunctions/composeProviders';
import { withAppStyles } from './styles';
import '../../primereactStyling/primereactDynamicOverwrite';

export const withApp = (Component: ComponentType) =>
  composeProviders(
    withAppPrimereactStylesIsolation,
    withAppStyles,
    withBaseProviders,
  )(Component);
