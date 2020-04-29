const {Packer} = require('ylang')

let webpackConfig = Packer.env('dev').config()

// console.info('the webpack config is ', webpackConfig)
module.exports = webpackConfig