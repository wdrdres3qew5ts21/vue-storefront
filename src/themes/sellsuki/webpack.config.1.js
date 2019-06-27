// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md

module.exports = function (config, { isClient, isDev }) {
  console.log(config.default.module)

  let configLoaders = config.default.module.rules
  configLoaders.push({
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  })
  console.log(configLoaders)
  return config
}
