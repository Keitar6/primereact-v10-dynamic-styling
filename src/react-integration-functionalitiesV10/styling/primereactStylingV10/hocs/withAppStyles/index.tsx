import { ComponentType } from 'react';
import StyleRegistry from '../../theme/StyleRegistry';
import { APP_NAME, PRODUCT_NAME } from '../../../../../utils/constants/globals';

export function withAppStyles<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <StyleRegistry themeStyleId={`${PRODUCT_NAME}|${APP_NAME}`}>
      <Component {...props} />
    </StyleRegistry>
  );
}
