import ALL_WORDS from './Allwords';

it('checks ALL_WORDS array is large', () => {
  expect(ALL_WORDS.length > 50000);
});

it('finds hebrew word in the big array', () => {
    expect(ALL_WORDS.includes("מחשבה"));
});

it('does not find gibrish word in the big array', () => {
    expect(! ALL_WORDS.includes("ררררר"));
});
