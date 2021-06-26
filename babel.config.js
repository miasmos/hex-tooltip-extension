module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    plugins: [
        [
            "const-enum",
            {
                transform: "constObject",
            },
        ],
    ],
};
