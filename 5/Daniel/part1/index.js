export const solveDay5Part1 = (input) =>
  (([[seeds], ...mappings]) =>
    seeds
      .map((seed) =>
        mappings.reduce(
          (acc, ranges) =>
            ((foundRange) =>
              foundRange != null ? foundRange[0] + (acc - foundRange[1]) : acc)(
              ranges.find(
                (range) => range[1] <= acc && acc < range[1] + range[2],
              ),
            ),
          seed,
        ),
      )
      .toSorted((a, b) => a - b)[0])(
    input.split('\n\n').map((group) =>
      group
        .split(':')[1]
        .trim()
        .split('\n')
        .map((line) => line.split(' ').map(Number)),
    ),
  )
