const path = require("path")

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
        ],
    },
    devtool: isDev ? "inline-source-map" : false,
}

module.exports = [main, renderer]
