import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Usage from './Usage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Usage open={true} />, div);
});
