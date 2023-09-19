const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  publicPath: '/PEII_CONNECT_TEST/',
  transpileDependencies: true,
  lintOnSave : false
})
