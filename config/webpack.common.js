const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const helpers = require('./helpers');

module.exports = {

    entry: {
        polyfill: '@babel/polyfill',
        main: helpers.root('/src/main.ts')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.scss', '.json'],
        alias: {
            '@': helpers.root('/src/'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'babel-loader!ts-loader'
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/,

            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            fiber: require('fibers'),
                            indentedSyntax: true // optional
                        },
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|cur)$/,
                use: ['file-loader']
            }
        ]
    }
}
