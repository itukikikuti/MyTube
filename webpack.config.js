const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === "development"

const main = {
    target: "electron-main",
    entry: {
        main: "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
}

const renderer = {
    target: "node",
    entry: {
        renderer: ["./src/App.jsx"],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: isDev },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: !isDev,
            inject: "body",
            scriptLoading: "blocking",
        }),
        new MiniCSSExtractPlugin(),
    ],
    devtool: isDev ? "inline-source-map" : false,
}

module.exports = [main, renderer]

/*
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const isDev = process.env.NODE_ENV === "development";
const base = {
    mode: isDev ? "development" : "production",
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    output: {
        path: path_1.default.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: "[name].js",
        assetModuleFilename: "images/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: mini_css_extract_plugin_1.default.loader,
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: isDev },
                    },
                    {
                        loader: "sass-loader",
                        options: { implementation: require("sass"), sourceMap: isDev },
                    },
                ],
            },
            {
                test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
                type: "asset/resource",
            },
        ],
    },
    devtool: isDev ? "inline-source-map" : false,
};
const main = Object.assign(Object.assign({}, base), { target: "electron-main", entry: {
        main: "./src/index.ts",
    } });
const renderer = Object.assign(Object.assign({}, base), { 
    target: "node", entry: {
        renderer: "./src/App.jsx",
    }, plugins: [
        new html_webpack_plugin_1.default({
            template: "./src/index.html",
            minify: !isDev,
            inject: "body",
            filename: "index.html",
            scriptLoading: "blocking",
        }),
        new mini_css_extract_plugin_1.default(),
    ] });
exports.default = [main, renderer];
*/
