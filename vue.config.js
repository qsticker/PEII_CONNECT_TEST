const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/PEII_CONNECT_TEST/'
    : '/',
  transpileDependencies: true,
  lintOnSave : false
})
