const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    webpack: {
        plugins: [new MiniCssExtractPlugin()],
        module: {
            rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            ],
        },        
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    githubDetailsContent: './src/chrome-services/github-details.content.ts',
                    background: './src/chrome-services/background.ts',
                    issueVisibleContent: './src/chrome-services/issue-visible.content.ts'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false
                }
            }
        },
    }
}