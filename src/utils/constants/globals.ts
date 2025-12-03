const REMOTES_NAME = 'test-example-remote';
const PRODUCT_NAME = 'test-example';
const APP_NAME = `${PRODUCT_NAME}-ui`;

type GlobalsNames = 'PRODUCT_NAME' | 'APP_NAME' | 'REMOTES_NAME';
type AppGlobals = Record<GlobalsNames, string>;

export const APP_GLOBALS: AppGlobals = {
  PRODUCT_NAME,
  APP_NAME,
  REMOTES_NAME,
};
