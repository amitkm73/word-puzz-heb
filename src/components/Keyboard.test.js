import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Keyboard from './Keyboard';

var testTiles = [
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"empty"},
  {letter: "א", dataState:"present"},
  {letter: "ב", dataState:"absent"},
  {letter: "ג", dataState:"correct"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"},
  {letter: "", dataState:"empty"}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Keyboard tileData={testTiles} />, div);
});

it('renders key called DEL', () => {
    render(<Keyboard tileData={testTiles} />);
    expect(screen.getByText('DEL')).toBeInTheDocument();
});
