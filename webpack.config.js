/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (config, argv) => ({
    entry: { background: "./src/background.ts", content: "./src/content.ts" },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"],
            },
            { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" },
        ],
    },
    ...(argv.NODE_ENV === "production" && {
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: { output: { ascii_only: true } },
                }),
            ],
        },
    }),
    devtool: "source-map",
    target: "web",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({ patterns: [{ from: "images", to: "." }] }),
    ],
});
