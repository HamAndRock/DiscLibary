const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const helpers = require('./helpers');


module.exports = merge(common, {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            vue$: 'vue/dist/vue.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
        }
    },
    output: {
        path: helpers.root('/dist'),
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js?[chunkhash]'
    },
    plugins: [

        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html',
            inlineSource: '.(css)$',
            template: './src/index.html',
        }),
        new HTMLInlineCSSWebpackPlugin(),

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {}
            }),
            new OptimizeCSSAssetsPlugin({})
        ],

    },
    module: {
        rules: [
            {test: /\.(png|jpg|jpeg|gif|cur|ico)$/, use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: "/images/"
                    }
                }]
            },
            {test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: "/fonts/"
                        }
                    }
                ]
            }
        ]
    }
});
