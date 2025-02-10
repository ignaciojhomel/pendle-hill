const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");


var indexConfig = Object.assign({}, defaultConfig, {
    name: "index",
    entry: {
        index: "./src/js/index.js",
        blocks: "./src/js/blocks.js",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
    },
});

module.exports = [defaultConfig, indexConfig];