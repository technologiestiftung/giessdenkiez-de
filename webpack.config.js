const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    entry: {
      main: './index.js'
    },

    output: {
      library: 'App'
    },

    module: {
        rules: [
            {
                // Transpile ES6 to ES5 with babel
                // Remove if your app does not use JSX or you don't need to support old browsers
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                  presets: ['@babel/preset-react']
                }
              }
        ]
    },
    plugins: [
        new Dotenv()
    ]
};