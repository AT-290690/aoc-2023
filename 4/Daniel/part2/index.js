export const solveDay4Part2 = (input) =>
  ((cardsWithPoints) =>
    Object.values(
      cardsWithPoints.reduce(
        (acc, cardPoints, currentCardIndex) => ({
          ...acc,
          ...Array.from(
            { length: cardPoints },
            (_, nextCardIndex) =>
              Number(nextCardIndex) + Number(currentCardIndex),
          ).reduce(
            (accCardIndices, cardIndex) => ({
              ...accCardIndices,
              [cardIndex + 1]:
                Number(accCardIndices[cardIndex + 1]) +
                Number(accCardIndices[currentCardIndex]),
            }),
            acc,
          ),
        }),
        {
          ...Array.from({ length: cardsWithPoints.length }, (_, index) => 1),
        },
      ),
    ).reduce((a, b) => a + b, 0))(
    input.split('\n').map((card) =>
      (([winningNumbers, numbersYouHave]) =>
        numbersYouHave.filter((numberYouHave) =>
          winningNumbers.includes(numberYouHave),
        ).length)(
        card
          .split(': ')[1]
          .split(' | ')
          .map((part) => part.split(' ').filter((number) => number !== '')),
      ),
    ),
  )
