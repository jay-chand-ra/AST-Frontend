import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RuleList from './RuleList';

test('renders rule list', () => {
  render(<RuleList />);
  expect(screen.getByRole('heading', { name: /Rule List/i })).toBeInTheDocument();
  expect(screen.getByText(/No rules found/i)).toBeInTheDocument();
});
