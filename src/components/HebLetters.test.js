import HEB_LETTERS from './HebLetters';

it('checks letters array size is correct', () => {
  expect(HEB_LETTERS.length === 27);
});

it('finds hebrew letter the array', () => {
    expect(HEB_LETTERS.includes("א"));
});

it('does not find english letter in the array', () => {
    expect(! HEB_LETTERS.includes("A"));
});
