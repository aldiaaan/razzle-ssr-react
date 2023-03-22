import React from 'react';

function ErrorPage() {
  return (
    <div tw="h-screen flex items-center justify-center flex-col container mx-auto px-3">
      <h3 tw="font-bold text-7xl text-indigo-900">404</h3>
      <h1 tw="mt-8 font-semibold text-2xl text-gray-700">Page Not Found</h1>
      <p tw="text-gray-500 text-lg font-medium mt-3 text-center">
        We`re sorry, the page you requested could not be found.
      </p>
    </div>
  );
}

export default ErrorPage;
