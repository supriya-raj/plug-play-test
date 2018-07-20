let config = require('../../config');

let loaders = require('./loaders');
let plugins = require('./plugins');

let paths = config.paths;
let join = require('path').join;
let stats = require('./stats');
let curDir = process.cwd();

module.exports = (env) => {
  let isProd = !!(env && env.production);

  return {
    context: process.cwd(),
    devServer: {
      contentBase: join(curDir, "build"),
      disableHostCheck: true,
      port: 8088,
      hot: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
          '**/images/**': {
          target: 'http://localhost:8088',
          pathRewrite: function(pathname) {
            return pathname.replace(/(.+)(?=\/images\/.+)/,'')
          }
        }
      }
    },
    watch: !isProd && true,
    entry: {
      client: join(curDir, paths.client.entry_script),
      plug: join(curDir, 'src/plug.jsx')
    },
    output: {
      path: join(curDir, paths.output.root),
      filename: join(paths.output.scripts, isProd ? '[name].bundle.js' : '[name].js'),
      publicPath: config.public_path
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json' ]
    },
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    stats: stats,
    module: {
      rules: loaders(isProd)
    },
    plugins: plugins(isProd)
  }
}
