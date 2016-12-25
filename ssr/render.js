import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore } from 'redux'
import {html} from 'common-tags'
import Helmet from 'react-helmet'

import rootReducer from '../frontend/scripts/reducers'
import ServerRoot from '../frontend/scripts/react/containers/ServerRoot'

const svgIconSprite = fs.readFileSync(path.join(__dirname, '../backend/build/specific_templates/icon-sprite.svg'), 'utf8')

const renderHead = (head, assetsHash) => {
  return html`
    <head>
      <meta charset='utf-8'>
    	<meta name='viewport' content='width=device-width, initial-scale=1.0' >

      ${head.title}
      <link rel="icon" href="/static/images/favicon.ico"/>

      <link rel='stylesheet' href='/assets/${assetsHash}.min.css' />

      <meta name='keywords' content='sdk, docs, snips, ai' />
      ${head.meta}

      <script src='/assets/${assetsHash}.min.js' async></script>
      <script>
        if (!/^(localhost|0\.0|192\.|get-dev-|staging-docs)/.test(window.location.hostname)) {
          mixpanelId = "fffb50939895382d08cc14ca10ff89f8"
          ;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-28086362-10', 'auto');
          ga('send', 'pageview');
        } else {
          mixpanelId = "3118ab516bbfb20e3809480eccc40c17"
        }
        ;(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
        mixpanel.init(mixpanelId);
      </script>
      ${svgIconSprite}
    </head>
  `
}

export function renderPage (path, PageComponent, assetsHash, props, actions) {
  // create
  const store = createStore(rootReducer)
  // assume already a lost of actions to be dispatched
  if (actions) {
    actions.forEach(action => store.dispatch(action))
  }
  // render
  const renderedBody = ReactDOMServer.renderToString(
    <ServerRoot
      store={store}
      appProps={{
        children: <PageComponent {...props} />
      }}
    />
  )
  // initial state of the store
  const initialState = JSON.stringify(store.getState())
  // NOTE: required even if not used,
  // otherwise causes memory leaks!
  const head = Helmet.rewind()
  return html`
    <!DOCTYPE html>
    <html>
      ${renderHead(head, assetsHash)}
      <div id="react_div">
        ${renderedBody}
      </div>
      <script>window.__INITIAL_STATE__ = ${initialState};</script>
    </html>
  `
}
