const isProd = process.argv.indexOf('--mode=development') === -1 ? true : false
console.log('-----------------------')
console.log('-- process.argv:', process.argv)
console.log('-- isProd:', isProd)
console.log('-----------------------')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    devtool: isProd ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                // type: 'asset/resource',
                // generator: {
                //     filename: 'bundle.css',
                // },
                // use: ['sass-loader'],
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name]-[hash][ext]',
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // compress: true,
        port: 9000,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
}
