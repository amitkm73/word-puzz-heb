import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import UserMsg from './UserMsg';

const msgText = "hello";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserMsg content={<> <p><b>{msgText}</b></p> </>} />, div);
});

it('renders a tile with the letter l', () => {
  render(<UserMsg content={<> <p><b>{msgText}</b></p> </>} />);
  expect(screen.getAllByText('hello') !== null);
});
