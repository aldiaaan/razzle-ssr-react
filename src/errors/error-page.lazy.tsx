import React from 'react';
import loadable from '@loadable/component';

export default loadable(() => import('./error-page'), {
  fallback: <div>loading..</div>,
  ssr: false,
});
