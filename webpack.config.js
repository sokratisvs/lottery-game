const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src', "index.js");

const config = {
    entry: { index: SRC_DIR },
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'src/assets/[name].[ext]'
                        }
                    },
                ],

            }
        ]
    },
    // devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        clientLogLevel: 'silent',
        port: process.env.DEV_SERVER_PORT,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        // build css bundle
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        // use env variables
        new Dotenv()
    ]
};

module.exports = config;