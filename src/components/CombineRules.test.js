import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombineRules from './CombineRules';

test('renders combine rules form', () => {
  render(<CombineRules />);
  expect(screen.getByRole('heading', { name: /Combine Rules/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Combine Rules/i })).toBeInTheDocument();
  // Add more specific tests based on your CombineRules component implementation
});
