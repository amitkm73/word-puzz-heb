import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Header from './Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});

it('renders WORD-HEB', () => {
    render(<Header />);
    expect(screen.getByText('WORD-HEB')).toBeInTheDocument();
});
