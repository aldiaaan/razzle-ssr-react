import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {loadableReady} from '@loadable/component';
import {hydrate} from 'react-dom';
import App from '../app';

loadableReady(() => {
  const rootNode = document.getElementById('app');

  if (!rootNode) return;

  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootNode,
  );
});

if (module.hot) {
  console.log('Hot reloading ...');
  module.hot.accept();
}
