const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const path = require("path");

module.exports = {
  options: {
  },
  plugins: [{
    name: 'bundle-analyzer',
    options: {
      target: 'web',
      env: 'production',
      bundleAnalyzerConfig: {}
    }
  }],
  modifyJestConfig({
    jestConfig, // the created jest config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    // Do some stuff...
    // console.log({jestConfig, webpackObject})
   jestConfig.testMatch = ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"];
   
    return jestConfig;
  },
  modifyWebpackOptions({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    options: {
      webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
    }
  }) {
    return webpackOptions;
  },
  modifyPaths(
    {
      webpackObject, // the imported webpack node module
      options: {
        razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      },
      paths // the default paths that will be used by Razzle.
    }) {

    paths.appServerJs = path.join(paths.appPath, 'src/framework/server');
    paths.appServerIndexJs = path.join(paths.appPath, 'src/framework');
    paths.appClientIndexJs = path.join(paths.appPath, 'src/framework/client');
    paths.appStaticExportJs = path.join(paths.appPath, 'src/framework/static-export');

    return paths;
  },
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    if (opts.env.target === "web") {
      const filename = path.resolve(__dirname, "build");

      if (process.env.NODE_ENV === 'production') {
        config.output.filename = "static/js/[contenthash:32].js";
        config.output.chunkFilename = "static/js/[contenthash:32].js";
      }

      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      );

      config.optimization = {
        ...config.optimization,
        runtimeChunk: {
          name: "runtime",
        },
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: (module) => {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `vendors.${packageName.replace("@", "")}`;
              },
            },
          },
        },

      }

    }


    return config;
  },
};