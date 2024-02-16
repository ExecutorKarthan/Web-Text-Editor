//Import needed libraries
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Create an export module to configure PWA settings
module.exports = () => {
  return {
    //Define the mode and the where the entry points are
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //Define the path and name of the PWA bundle
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Load the HTML into the webpack
      new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
      }),
      
      //Plugin to route the service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        //Create a manifest file with appropriate informational parameters
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'This is a Progressive Web App that functions as a text editor.',
        theme_color: "#225ca3",
        background_color: '#225ca3',
        orientation: "portrait",
        display: "standalone",
        start_url: './',
        publicPath: './',
        //Generate icons of different sizes and provide the HTML a means to render
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('assets', 'icons')
          },
        ],
        //Disable the automatic file naming
        fingerprints: false
      }),
    ],

    module: {
      rules: [
        //CSS loader to allow for styling
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
