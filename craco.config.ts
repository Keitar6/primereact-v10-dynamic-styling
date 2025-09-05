const { withModuleFederation } = require('@module-federation/enhanced/craco');

const APP_NAME = 'tele-test';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return withModuleFederation(webpackConfig, {
        name: APP_NAME,
        filename: 'remoteEntry.js',
        exposes: {
          './TestWebcomponent': './src/bootstrap.ts',
          './TestRemote': './src/remotes/remote/bootstrap.ts',
        },
        // You can add shared, remotes, etc. here as needed
      });
    },
  },
};
