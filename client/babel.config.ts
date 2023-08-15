module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ["@babel/preset-react", { "runtime": "automatic" }],
        '@babel/preset-typescript',
    ],
    plugin: [
        [
            'babel-plugin-transform-imports',
            {
                '@material-ui/core': {
                    'transform': '@material-ui/core/${member}',
                    'preventFullImport': true
                }
            }
        ]
    ]
};