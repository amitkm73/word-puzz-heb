import getSolution from './Solutions';

it('checks puzzle number and solution are valid', () => {
    // $ npm run test:debug, chrome about:inspect + uncomment the next row to debug tests
    // debugger;
    const [puzzleNum, puzzleSolution] = getSolution();
    expect(puzzleNum > 0).toBe(true);
    expect(puzzleNum < 999999).toBe(true);
    expect(typeof(puzzleSolution) === 'string').toBe(true);
    expect(puzzleSolution).toHaveLength(5);
})
