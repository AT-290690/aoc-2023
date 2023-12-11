import { read } from '../../AT/utils.js'
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => x.split(''))

const sample = parse(`
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`)
const sample2 = parse(`
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`)
const manhattan = (y1, y2, x1, x2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)
const distance = (source, target) => {
  return manhattan(source.y, target.y, source.x, target.x)
}
const show = (universe) =>
  universe
    .map((x) => x.map((y) => (y ? y.toString() : '.')).join(''))
    .join('\n')
const pairsN = (n) => (n * (n - 1)) / 2
const pairwise = (galaxies) => {
  if (galaxies.length < 2) return []
  const first = galaxies[0],
    rest = galaxies.slice(1),
    pairs = rest.map((x) => [first, x])
  return pairs.concat(pairwise(rest))
}
const inputToUniverse = (input) => {
  let count = 0
  return input.map((x) => x.map((y) => (y === '#' ? ++count : 0)))
}
const expandUniverse = (universe) => {
  const horizontal = []
  const vertical = []
  const height = universe.length
  const width = universe[0].length
  for (let y = 0; y < height; ++y) {
    let h = 0
    let v = 0
    for (let x = 0; x < width; ++x) {
      if (universe[y][x]) h = 1
      if (universe[x][y]) v = 1
    }
    horizontal.push((1 - h) * 1)
    vertical.push((1 - v) * 1)
  }
  const expanded = []
  let max = -Infinity
  for (let y = 0; y < height; ++y) {
    expanded.push([])
    for (let x = 0; x < width; ++x) {
      if (vertical[x]) expanded.at(-1).push(0)
      expanded.at(-1).push(universe[y][x])
    }
    if (horizontal[y]) expanded.push([])
    max = Math.max(max, expanded.at(-1).length)
  }
  for (let y = 0; y < expanded.length; ++y) {
    for (let x = 0; x < expanded[0].length; ++x) {
      if (expanded[y].length === 0)
        expanded[y] = Array.from({ length: max }).fill(0)
    }
  }
  return expanded
}
const universeToGalaxies = (universe) => {
  const galaxies = []
  for (let y = 0; y < universe.length; ++y)
    for (let x = 0; x < universe[0].length; ++x)
      if (universe[y][x]) galaxies.push({ x, y })
  return galaxies
}
const part1 = (input) =>
  pairwise(universeToGalaxies(expandUniverse(inputToUniverse(input))))
    .map(([a, b]) => distance(a, b))
    .reduce((a, b) => a + b, 0)
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
