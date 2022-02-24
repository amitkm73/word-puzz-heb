import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import InvalidWord from './InvalidWord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InvalidWord />, div);
});
