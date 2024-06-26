import React from 'react';
import loadable from '@loadable/component';

export default loadable(() => import('./app'), {
  fallback: <div></div>,
});
