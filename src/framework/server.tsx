import path from 'path';
import React from 'react';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server';
import {StaticRouter} from 'react-router-dom/server';
import {CacheProvider} from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import {Helmet} from 'react-helmet';
import serialize from 'serialize-javascript';
import AppLazy from '../app.lazy';
import App from '../app';
import {RuntimeConfig} from './config';
import {isDev} from './utils';

const server = express();

export const renderApp = (req: express.Request, res: express.Response): {html?: string; redirect?: string} => {
  const key = 'css';
  const cache = createCache({key});
  const {extractCriticalToChunks, constructStyleTagsFromChunks} = createEmotionServer(cache);

  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    // razzle client bundle entrypoint is client.js
    entrypoints: ['client'],
  });

  const isBot = Boolean(req.query.isBot);

  const markup = renderToString(
    <CacheProvider value={cache}>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <ChunkExtractorManager extractor={extractor}>
        <StaticRouter location={req.url}>{isBot ? <App /> : <AppLazy />}</StaticRouter>
      </ChunkExtractorManager>
    </CacheProvider>,
  );

  const helmet = Helmet.renderStatic();

  const chunks = extractCriticalToChunks(markup);
  const styles = constructStyleTagsFromChunks(chunks);

  const scriptTags = extractor.getScriptTags();

  const linkTags = extractor.getLinkTags();

  const html = `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}> 
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${styles}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${linkTags}
        <script type="text/javascript">window.__APP_CONFIG__ = ${serialize(RuntimeConfig)}</script>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <noscript><div>Website ini memerlukan javascript untuk berjalan.</div></noscript>
        <div id="app">${markup}</div>
        ${scriptTags}
       
      </body>
    </html>
  `;

  return {html};
};

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res, next) => {
    try {
      const {html, redirect} = renderApp(req, res);
      if (redirect) {
        res.redirect(redirect);
      } else {
        res.send(html);
      }
    } catch (error) {
      next(error);
    }
  });

export default server;
