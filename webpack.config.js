module.exports = {
    // ...
    resolve: {
        byDependency: {
            // ...
            esm: {
                mainFields: ['browser', 'module'],
            },
            commonjs: {
                aliasFields: ['browser'],
            },
            url: {
                preferRelative: true,
            },
        },
        cache: true,
        cachePredicate: (module) => {
            // additional logic
            return true;
        },
    },
}