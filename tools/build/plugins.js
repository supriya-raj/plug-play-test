let join = require('path').join;
let webpack = require('webpack');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
let manifestFormatter = require('@practo/manifest-revision-formatter-webpack');
let RevReplacePlugin = require('@practo/rev-replace-plugin');
let BuildMessagePlugin = require('@practo/build-message-webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let parseArr = require('./helpers').parseArr;
let config = require('../../config');
let paths = config.paths;

let outputRoot = join(process.cwd(), paths.output.root);

/* Create a util to manage adding of hash into filenames based on ENV */

let extractVendor = (isProd) => {
  return new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
      if(module.context && module.context.indexOf('node_modules') !== -1 ) {
        return true;
      }
      return false;
    },
    filename: join(paths.output.scripts, isProd ? '[name].[chunkhash:12].js' : '[name].js')
  });
}

let extractText = (isProd) => {
  return isProd && new ExtractTextPlugin({
    filename: join(paths.output.styles, isProd ? '[name].[contenthash:12].css' : '[name].css')
  });
}

let loaderOptions = (isProd) => {
  return isProd && new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  });
}

let uglifyJs = (isProd) => {
  return isProd && new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      drop_console: true,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      dead_code: true,
      if_return: true,
      join_vars: true,
      warnings: false
    },
    output: {
      comments: false
    }
  });
}

let definePlugin = (isProd) => {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.BROWSER': JSON.stringify('true'),
    'process.env.COMMIT_HASH': JSON.stringify(process.env.COMMIT_HASH),
    'process.env.APP_NAME': JSON.stringify(process.env.APP_NAME),
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST)
  });
}

let manifestRevision = () => {
  return new ManifestRevisionPlugin(join(outputRoot, 'manifest.json'), {
    rootAssetPath: './public',
    ignorePaths: [],
    format: manifestFormatter
  });
}

let revReplace = (isProd) => {
  return isProd && new RevReplacePlugin({
    manifest: join(outputRoot, 'manifest.json'),
    output: outputRoot,
    revision_scripts: true
  });
}

let buildMessage = () => {
  return new BuildMessagePlugin({
    message: 'Starting build ... '
  });
}

let dllPlugin = (isProd) => {
  return false && !isProd && new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require(join(outputRoot, 'dll', 'vendor.json'))
  });
}

let htmlPlugin = (isProd) =>
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: true,
    prod: !!isProd,
    config
});

let namedModulesPlugin = (isProd) => !isProd && new webpack.NamedModulesPlugin();

let bundleAnalyzerPlugin = (isProd) => {
  return false && new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  })
}

let hotPlugin = (isProd) => !isProd && new webpack.HotModuleReplacementPlugin();

let plugins = [
  //extractVendor,
  extractText,
  loaderOptions,
  //uglifyJs,
  definePlugin,
  //manifestRevision,
  //revReplace,
  buildMessage,
  //dllPlugin,
  namedModulesPlugin,
  htmlPlugin,
  bundleAnalyzerPlugin,
  hotPlugin
];

module.exports = parseArr(plugins);
