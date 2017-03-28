const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ["./client/apollo/src/index.js"] // defaults to apollo
        // app: ["./client/relay/src/index.js"] // defaults to apollo
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    target: "web",

    devtool: "source-map",
    cache: false,

    devServer: {
        contentBase: './client/public',
        proxy: {
            '/api': {
                target: 'http://localhost:3000/public/index.html',
                secure: false
            },
            '/graphql': {
                target: 'http://localhost:3010',
                secure: false
            }
        }
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015', 'stage-2', 'react'
                            ]
                        // 'stage-2': true, 'react': true, 'react-hmre': true
                    },
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']            },
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract('css!sass')
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {//dunno about this
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file?name=public/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "client/public/style.css",
            allChunks: true
        })
        , new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            }
        })
        ,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
};