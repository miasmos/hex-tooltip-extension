/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pkg = require("./package.json");

const zipName = `${pkg.name}-v${pkg.version}.zip`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (config, argv) => ({
    entry: {
        background: "./src/background.ts",
        content: "./src/content.ts",
    },
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
    ...(argv.NODE_ENV === "development" && { devtool: "source-map" }),
    target: "web",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "",
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["!manifest.json"],
        }),
        new CopyPlugin({ patterns: [{ from: "images", to: "." }] }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    archive: [{ source: "dist", destination: `dist/${zipName}` }],
                },
            },
        }),
    ],
});
