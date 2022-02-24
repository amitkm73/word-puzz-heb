import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Row from './Row';

const testRowStates = "ecapt";
const testRowWord = "hello";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Row rowword={testRowWord} rowdatastates={testRowStates} />, div);
});

it('renders a tile with the letter l', () => {
    render(<Row rowword={testRowWord} rowdatastates={testRowStates} />);
    expect(screen.getAllByText('l') !== null);
});
