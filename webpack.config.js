const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const miniCss = new MiniCss({
    filename: 'mainPage.css'
});

const terserPlugin = new TerserPlugin({
    extractComments: false
});

const copyPlugin = new CopyPlugin({
    patterns: [
        {
            from: 'stub',
            to: 'assets/stub',
            context: 'src/assets',
            noErrorOnMissing: true
        }
    ]
});

module.exports = function (_, webpackEnv) {

    const isDevelopment = webpackEnv.mode === 'development';
    const isProduction = webpackEnv.mode === 'production';
    const getStyleLoaders = () => {
        return [
            isDevelopment && 'style-loader',
            isProduction && MiniCss.loader,
            {
                loader: 'css-loader',
                options: {
                    esModule: true,
                    // modules: {
                    //     localIdentName: isDevelopment
                    //         ? '[folder]_[local]_[hash:base64:4]'
                    //         : '[hash:base64:5]',
                    // },
                    sourceMap: isDevelopment,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    sourceMap: isDevelopment
                }
            }
        ].filter(Boolean);

    };

    const tsRule = {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader']
    };

    const cssRule = {
        test: /\.s?css$/,
        // exclude: /node_modules/,
        use: getStyleLoaders()
    };

    const fontsRule = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: [/node_modules/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        type: "asset/resource",
        generator: {
            filename: 'assets/fonts/[name]_[contenthash:8].[ext]'
        }
    };

    const imgRule = {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        exclude: [/node_modules/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: [{
            loader: 'file-loader',
            options: {
                outputPath: 'assets/imgs/',
                name: '[name]_[contenthash:8].[ext]'
            }
        }]
    };

    return {
        devtool: isDevelopment ? 'cheap-module-source-map' : false,
        target: ['web', 'es5'],
        entry: './src/index.tsx',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            filename: isDevelopment ? "./js/[name].js" : "./js/[name]_[contenthash:8].js",
            chunkFilename: isDevelopment ? "./js/[name].js" : "./js/[name]_[contenthash:8].js",
            assetModuleFilename: 'assets/[hash][ext]',
            clean: true
        },

        module: {
            rules: [tsRule, cssRule, fontsRule, imgRule]
        },
        optimization: {
            minimize: isProduction,
            minimizer: [terserPlugin],
        },
        plugins: [htmlWebpackPlugin, miniCss, copyPlugin],
        devServer: {
            historyApiFallback: true,
            port: 3000
        },

        // watch: true
    }
};

