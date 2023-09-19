const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'dist',
  publicPath: '/',
  transpileDependencies: true,
  lintOnSave : false
})
