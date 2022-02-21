import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import Stats from './Stats';

const msgText = "stats-test";
const userNumPlayed = 50;
const userCurrentStreak = 10;
const userMaxStreak = 15;
const userWins = [1,2,3,4,5,6];
const div = document.createElement('div');

it('renders without crashing', () => {
  ReactDOM.render(<Stats msgText={msgText} userNumPlayed={userNumPlayed} userCurrentStreak={userCurrentStreak} userMaxStreak={userMaxStreak} userWins={userWins}/>, div);
});

it('shows number of games played', () => {

  render(<Stats msgText={msgText} userNumPlayed={userNumPlayed} userCurrentStreak={userCurrentStreak} userMaxStreak={userMaxStreak} userWins={userWins}/>);
  expect(screen.getByText('50')).toBeInTheDocument();
});

it('shows correct % of wins', () => {
  // total wins = 1+2+..+6=21, games playes = 50 ==> expect 42%
  render(<Stats msgText={msgText} userNumPlayed={userNumPlayed} userCurrentStreak={userCurrentStreak} userMaxStreak={userMaxStreak} userWins={userWins}/>);
  expect(screen.getByText('42%')).toBeInTheDocument();
});
