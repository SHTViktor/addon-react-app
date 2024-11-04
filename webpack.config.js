const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const Dotenv = require( 'dotenv-webpack' )


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

        new Dotenv()

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