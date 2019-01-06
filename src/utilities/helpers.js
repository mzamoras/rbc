
export const cssModuleNaming = prod => {
    const hashing = 'hash:base64';
    return prod ? `[${hashing}:7]`: `[name]--[local]__[${hashing}:5]`;
};

export const formatCssLoader = (isProduction, cssOptions = null, postOptions = null) => {
    const cssLoaders = [{
        loader : 'css',
        options: cssOptions || {
            modules       : true,
            localIdentName: cssModuleNaming(isProduction),
            sourceMap     : !isProduction,
            //minimize      : isProductionEnvironment
            //importLoaders: 1
        }
    }];

    const postCssLoaders = {
        loader : 'postcss',
        options: {
            ident  : 'postcss',
            plugins: function () {
                return [
                    require('autoprefixer')( postOptions || {
                        browsers: [
                            '>2%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ]
                    } )
                ]
            }
        }
    };

    return isProduction ? [].concat(cssLoaders, postCssLoaders) : cssLoaders;
};
