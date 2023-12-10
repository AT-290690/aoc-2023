export const solveDay4Part1 = (input) =>
  input
    .split('\n')
    .map((card) =>
      (([winningNumbers, numbersYouHave]) =>
        ((matchesCount) => (matchesCount === 0 ? 0 : 2 ** (matchesCount - 1)))(
          numbersYouHave.filter((numberYouHave) =>
            winningNumbers.includes(numberYouHave),
          ).length,
        ))(
        card
          .split(': ')[1]
          .split(' | ')
          .map((part) => part.split(' ').filter((number) => number !== '')),
      ),
    )
    .reduce((a, b) => a + b, 0)
