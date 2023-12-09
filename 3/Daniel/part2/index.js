export const solveDay3Part2 = (input) =>
  (({ numberPositions, starPositions }) =>
    starPositions.map((starPosition) =>
      ((adjacentNumbers) =>
        adjacentNumbers.length === 2
          ? Number(adjacentNumbers[0][0]) * Number(adjacentNumbers[1][0])
          : 0)(
        numberPositions.filter(
          ([number, numberPosition]) =>
            Math.abs(starPosition[0] - numberPosition[0]) <= 1 &&
            starPosition[1] + 1 >= numberPosition[1] &&
            starPosition[1] - 1 <= numberPosition[1] + number.length - 1,
        ),
      ),
    ))(
    input.split('\n').reduce(
      (acc, row, rowId) => ({
        ...acc,
        numberPositions: [
          ...acc.numberPositions,
          ...((numbers) =>
            [...numbers].reduce(
              (acc, number) => [...acc, [number[0], [rowId, number.index]]],
              [],
            ))(row.matchAll(/\d+/g)),
        ],
        starPositions: [
          ...acc.starPositions,
          ...row
            .split('')
            .map((col, colId) => col === '*' && [rowId, colId])
            .filter(Boolean),
        ],
      }),
      { numberPositions: [], starPositions: [] },
    ),
  ).reduce((a, b) => a + b, 0)
