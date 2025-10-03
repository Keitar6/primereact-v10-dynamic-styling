import { ComponentType } from 'react';

import StyleRegistry from '../../../utils/primereactStyling/theming/registry';
import { APP_NAME, PRODUCT_NAME } from '../../../utils/constants/globals';

export function withRemoteStyles<P extends object>(
  RemoteComponent: ComponentType<P>,
): ComponentType<P> {
  return (props: P) => (
    <StyleRegistry themeStyleId={`${PRODUCT_NAME}|${APP_NAME}`}>
      <RemoteComponent {...props} />
    </StyleRegistry>
  );
}
