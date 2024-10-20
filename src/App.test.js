import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders main app components', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Rule Engine with AST/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Rule List/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Create Rule/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Combine Rules/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Evaluate Rule/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Documentation/i })).toBeInTheDocument();
});
