console.log( 'basicPackages' );

const packsElem = {};

packsElem.node = [
    "chalk",
    "glob",
    "dotenv",
    "dotenv",
    "fs-extra",
    "promise",
    "autoprefixer",
    "cross-env",
    "cross-env",
    "less",
    "fsevents",
    "inquirer"
];

packsElem.babel =[

    "babel-cli",
    "babel-core",
    "babel-runtime",
    "babel-eslint",
    "babel-jest",
    "babel-polyfill",

    //Presets
    "babel-preset-env",
    "babel-preset-react",
    "babel-preset-react-hmre",

    //Plugins
    "babel-plugin-import",
    "babel-plugin-transform-class-properties",
    "babel-plugin-transform-object-rest-spread",
    "babel-plugin-transform-runtime",
    "babel-plugin-import",
    "babel-plugin-import",
    "babel-minify-webpack-plugin"
],

packsElem.loaders = [
    "babel-loader",
    "css-loader",
    "eslint-loader",
    "file-loader",
    "style-loader",
    "url-loader",
    "bundle-loader",
    "less-loader",
    "postcss-loader",
    "postcss-flexbugs-fixes",
    "react-hot-loader",
    "karma-sourcemap-loader",
];

packsElem.webpack = [
    "webpack",
    "webpack-bundle-analyzer",
    "webpack-dev-middleware",
    "webpack-hot-middleware",
    "webpack-notifier",
    
    //Plugins
    "webpack-manifest-plugin",
    "write-file-webpack-plugin",
    "extract-text-webpack-plugin",
    "case-sensitive-paths-webpack-plugin",
    "html-webpack-plugin",
    "compression-webpack-plugin"
];

packsElem.eslint = [
    "eslint",

    "eslint-plugin-flowtype",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-import",
]

packsElem.test = [
    "karma",
    "mocha",
    "sinon",
    "chai",
    "jest",
    "expect",
    "karma-chai",
    "karma-chrome-launcher",
    "karma-mocha",
    "karma-mocha-reporter",
    "karma-notify-reporter",
    "karma-sinon",
    "karma-webpack",
    "karma-sourcemap-loader",
    "redux-mock-store"
];


packsElem.server = [
    "webpack-dev-server",
    "browser-sync",
    "connect-gzip-static"
];


packsElem.development = [
    "prop-types",
    "axios",
    "classnames",
    "shallowequal",
    "react-jss",
    "react-helmet",
    "react-tap-event-plugin",
    "react-addons-perf",
    "immutability-helper",
    
    //React Router
    "react-router-dom",
    "react-router-redux@next",
    
    //Redux
    "redux",
    "react-redux",
    "redux-logger",
    "redux-thunk",
];

let res2 = [];
for (var key in packsElem) {
    if (packsElem.hasOwnProperty(key)) {
        var element = packsElem[key];
        for (let index = 0; index < packsElem[key].length; index++) {
            res2.push( packsElem[key][index] );
        }        
    }
}



console.log( "--- yarn add (" + res2.length +")--" );
console.log( res2.join(" ") );
console.log( "---------------" );