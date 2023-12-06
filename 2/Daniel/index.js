export const solveDay2Part1 = (
  input,
  maxCubesByColor = { red: 12, green: 13, blue: 14 },
) =>
  input
    .split('\n')
    .map((game) => game.split('Game ')[1])
    .map((game) => game.split(': '))
    .filter(([_gameId, gameSets]) =>
      gameSets
        .split('; ')
        .every((gameSet) =>
          gameSet
            .split(', ')
            .every((colorCount) =>
              (([count, color]) => count <= maxCubesByColor[color])(
                colorCount.split(' '),
              ),
            ),
        ),
    )
    .map(([gameId]) => Number(gameId))
    .reduce((a, b) => a + b, 0)

export const solveDay2Part2 = (input) =>
  input
    .split('\n')
    .map((game) => game.split(': ')[1])
    .map((game) =>
      Object.values(
        game
          .split('; ')
          .map((set) => set.split(', '))
          .flat()
          .reduce(
            (acc, colorCount) =>
              (([count, color], countNumber = Number(count)) => ({
                ...acc,
                [color]: acc[color] > countNumber ? acc[color] : countNumber,
              }))(colorCount.split(' ')),
            {},
          ),
      ).reduce((a, b) => a * b, 1),
    )
    .reduce((a, b) => a + b)
