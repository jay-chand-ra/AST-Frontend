import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvaluateRule from './EvaluateRule';

test('renders evaluate rule form', () => {
  render(<EvaluateRule />);
  expect(screen.getByRole('heading', { name: /Evaluate Rule/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Evaluate/i })).toBeInTheDocument();
});
