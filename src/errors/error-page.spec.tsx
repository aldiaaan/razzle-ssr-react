import {describe, expect, test} from '@jest/globals';
import React from 'react';
import {render, screen} from '@testing-library/react';
import ErrorPage from './error-page';

describe('error page', () => {
  test('it renders correctly', async () => {
    render(<ErrorPage />);
  });
});
