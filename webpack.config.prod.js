const {Packer} = require('ylang')

let webpackConfig = Packer.env('prod').config()

// console.info('the webpack config is ', webpackConfig)
module.exports = webpackConfig