import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {hydrate} from 'react-dom';
import {loadableReady} from '@loadable/component';
import App from '../app';

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app'),
  );
});

if (module.hot) {
  console.log('Hot reloading ...');
  module.hot.accept();
}
