
const path = require('path');


module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },
    plugins: [],
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.xml$/i,
                use: 'raw-loader',
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "imgs"
                    }
                }
            },
        ]
    },
};