import React from 'react';
import {Route, Routes as BrowserRoutes} from 'react-router-dom';
import ErrorPage from './features/errors/error-page.lazy';

export default function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/*" element={<ErrorPage />} />
    </BrowserRoutes>
  );
}
