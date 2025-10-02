import { ComponentType } from 'react';
import { withProviders } from './withProviders';
import { withAppPrimereactStylesIsolation } from '../primereactStyling/hocs/app';
import { composeProviders } from '../globalFunctions/composeProviders';
import '../primereactStyling/primereactDynamicOverwrite/';

export const withApp = (Component: ComponentType) =>
  composeProviders(withAppPrimereactStylesIsolation, withProviders)(Component);
