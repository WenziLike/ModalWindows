// "use strict";

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: []
    //development
    //production
});

module.exports = new Promise((resolve, reject) => {
    "use strict";
    resolve(buildWebpackConfig);
});