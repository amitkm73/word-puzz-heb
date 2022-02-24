import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Settings from './Settings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Settings open={true}/>, div);
});

it('renders a tile with the letter l', () => {
    render(<Settings open={true}/>);
    expect.anything(screen.getAllByText('Email'));
});
