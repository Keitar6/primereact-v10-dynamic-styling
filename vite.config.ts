/// <reference types='vitest' />
import { writeFileSync } from 'fs';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { viteStaticCopy } from 'vite-plugin-static-copy';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { APP_NAME } from './src/onecxIntegration/utils/globals';

/// <reference types='ModuleFederationOptions' />
const mfConfig = {
  name: APP_NAME,
  filename: 'remoteEntry.js',
  exposes: {
    './TestWebcomponent': './src/bootstrap.ts',
    './TestRemote': './src/remotes/test-remote/bootstrap.ts',
  },
};
export default defineConfig(({ mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());

  return {
    root: __dirname,
    base: mode === 'production' ? '/mfe/test-example/' : '/',
    cacheDir: './node_modules/.vite/apps/test-webcomponent',
    server: {
      port: 4200,
      host: 'localhost',
      hmr: false,
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      {
        name: 'generate-environment',
        options: function () {
          writeFileSync(
            './src/environment.ts',
            `export default ${JSON.stringify(selfEnv, null, 2)};`,
          );
        },
      },

      viteStaticCopy({
        targets: [
          {
            src: path.resolve(
              __dirname,
              './src/onecxIntegration/styles/styles.css',
            ),
            dest: '', // this will place it directly under /mfe/vite-example-ui/
          },
        ],
      }),

      // {
      //   name: 'serve-scss',
      //   configureServer(server) {
      //     server.middlewares.use('/mfe/vite-example-ui/styles.scss', (req, res) => {
      //       const filePath = path.resolve(__dirname, 'src/styles/styles.scss');
      //       const file = fs.readFileSync(filePath, 'utf-8');
      //       res.setHeader('Content-Type', 'text/x-scss');
      //       res.end(file);
      //     });
      //   },
      // },

      react(),
      federation(mfConfig),
      cssInjectedByJsPlugin(),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    resolve: {
      alias: {
        '@onecx/react-webcomponents': path.resolve(
          __dirname,
          'libs/react-webcomponents/src',
        ),
        '@onecx/react-auth': path.resolve(__dirname, 'libs/react-auth/src'),

        '@onecx/react-integration-interface': path.resolve(
          __dirname,
          'libs/react-integration/src',
        ),
        '@onecx/react-remote-components': path.resolve(
          __dirname,
          'libs/react-remote-components/src',
        ),
      },
    },
    build: {
      outDir: './dist/apps/test-webcomponent',
      target: 'esnext',

      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
