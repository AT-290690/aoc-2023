export const solveDay3Part1 = (input) =>
  (({ numberPositions, symbolPositions }) =>
    numberPositions.filter(([number, numberPosition]) =>
      symbolPositions.some(
        (symbolPosition) =>
          Math.abs(symbolPosition[0] - numberPosition[0]) <= 1 &&
          symbolPosition[1] + 1 >= numberPosition[1] &&
          symbolPosition[1] - 1 <= numberPosition[1] + number.length - 1,
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
        symbolPositions: [
          ...acc.symbolPositions,
          ...row
            .split('')
            .map(
              (col, colId) =>
                col !== '.' && !/^\d+$/.test(col) && [rowId, colId],
            )
            .filter(Boolean),
        ],
      }),
      { numberPositions: [], symbolPositions: [] },
    ),
  )
    .map(([number]) => Number(number))
    .reduce((a, b) => a + b, 0)
