import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Documentation from './Documentation';

test('renders documentation', () => {
  render(<Documentation />);
  expect(screen.getByRole('heading', { name: /Documentation/i })).toBeInTheDocument();
});
