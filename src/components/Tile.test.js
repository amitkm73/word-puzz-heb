import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Tile from './Tile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile letter="e" dataState="correct" />, div);
});

it('renders a tile with the letter e', () => {
    render(<Tile letter="e" dataState="correct" />);
    expect(screen.getAllByText('e') !== null);
});
