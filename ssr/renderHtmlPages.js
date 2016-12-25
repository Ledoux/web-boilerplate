require('babel-register')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const renderPage = require('./render').renderPage
const HomePage = require('../frontend/scripts/react/pages/HomePage').default

const DIST_DIR = path.join(__dirname, '../dist/')

function writeToFile (filePath, html) {
  let dir = path.join(DIST_DIR, filePath)
  // we need here to create an <htmlName>/index.html file system
  // here because s3 routing will direclty see on its bucket
  // to the path <dns>/<htmlName> if there is an index.html
  // and will render it if that so
  // to remove the html
  const folderDir = dir
  const fileDir = path.join(folderDir, 'index.html')
  mkdirp.sync(folderDir)
  fs.writeFileSync(fileDir, html)
  if (process.env.TYPE !== 'PROFILE') {
    console.log('wrote', dir)
  }
}

function renderHtmlPages (assetsHash) {
  // only one page in this project
  const html = renderPage('/', HomePage, assetsHash)
  writeToFile('/', html)
}

module.exports = renderHtmlPages
