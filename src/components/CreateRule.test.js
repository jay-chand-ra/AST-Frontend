import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRule from './CreateRule';

test('renders create rule form', () => {
  render(<CreateRule />);
  expect(screen.getByRole('heading', { name: /Create Rule/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /Rule Name/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /Rule String/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create Rule/i })).toBeInTheDocument();
});
