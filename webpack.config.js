const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const Dotenv = require( 'dotenv-webpack' );
const { DefinePlugin } = require('webpack');


module.exports = {

    mode: ( 'development' === process.env.NODE_ENV ? 'development' : 'production' ),

    entry: [
        './src/index.js',
    ],

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'build/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin( {
            filename: 'build/styles.css'
        } ),

        new HTMLWebpackPlugin( {
            filename: 'index.html',
            template: path.resolve( __dirname, 'public/index.html' ),
            minify: false,
        } ),

        new Dotenv(),

        new DefinePlugin({
            'process.env.REACT_APP_JIRA_DOMAIN': JSON.stringify(process.env.REACT_APP_JIRA_DOMAIN),
            'process.env.REACT_APP_JIRA_API_TOKEN': JSON.stringify(process.env.REACT_APP_JIRA_API_TOKEN),
            'process.env.REACT_APP_EMAIL': JSON.stringify(process.env.REACT_APP_EMAIL),
        }),

    ],

    resolve: {
        extensions: [ '.js', '.jsx', '.scss' ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,

                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/,
                }
            }
        }
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
    },

    devtool: 'source-map'
};