'use strict'
const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev')
const fse = require('fs-extra')

const app = express()

const port = 4000

config.entry.client = [
  `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
  config.entry.client
]

config.output.publicPath = `http://localhost:${port}/assets/`

const compiler = webpack(config)

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})
app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

const mfs = devMiddleWare.fileSystem
const file = path.join(config.output.path, '../index.html')
devMiddleWare.waitUntilValid(() => {
  const html = mfs.readFileSync(file)
  fse.ensureDirSync(path.dirname(file))
  fs.writeFile(file, html, 'utf8', err => {
    if (err) console.log(err)
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
