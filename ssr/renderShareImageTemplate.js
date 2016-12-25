require('babel-register')
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import ShareImageTemplate from '../frontend/scripts/react/components/ShareImageTemplate'

const DIST_DIR = path.join(__dirname, '../dist')
const OUTPUT_PATH = path.join(__dirname, '../shareImageTemplate.html')

const shareImageBgPath = '{{{PATH_TO_SHARE_IMAGE_BG}}}share-image-bg.png'

function renderShareImageTemplate (hash) {
  const CSS_PATH = path.join(DIST_DIR, `assets/${hash}.min.css`)
  const styles = fs.readFileSync(CSS_PATH, 'utf8')
    .replace(/(\d+(\.\d+)?)rem/g, (_, value) => {
      return value * 16 + 'px'
    })

  const reactMarkup = ReactDOMServer.renderToStaticMarkup(<ShareImageTemplate />)
  const html = `<!DOCTYPE html>
  <!-- IMPORTANT: this file is generated! -->
  <html>
    <head>
      <style>${styles}
        /* GoT */
        h1,.h1 {
          font-size: 2em;
        }
        /* episodes */
        h2,.h2 {
          font-size: 1.75em;
        }
        /* numbers */
        .mega {
          font-size: 4em;
        }
        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        .foreground {
          position: relative;
          z-index: 1;
          font-size: 1.375em;
        }
        html,
        body,
        .foreground {
          height: 100%;
        }
        .uberstats__section-title {
          font-size: 0.75em;
        }
        /*
          - border-width because the pt unit that comes out of minification doesn't work
          - left because neither transform nor margin-auto works, so just approx center
        */
        .uberstats__separator:after,.uberstats__separator:before{
          border-width:12px;
          left: 47%;
        }
        /* increase border with so visible in image */
        .uberstats__separator {
          border-width: 2px;
        }
        .uberstats__separator:after {
          margin-top:-3px
        }
        .centerer {
          display:table;
          width:100%;
          height:100%;
        }
        .content {
          display:table-cell;
          vertical-align:middle;
          height:100%;
          width:60%;
          padding-left:20%;
          padding-right:20%;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <img class='background' src="${shareImageBgPath}">
      <div class='foreground'>
        <div class='centerer'>
          <div class='content'>
            ${reactMarkup}
          </div>
        </div>
      </div>
    </body>
  </html>
  `
  fs.writeFileSync(OUTPUT_PATH, html)
}

module.exports = renderShareImageTemplate
