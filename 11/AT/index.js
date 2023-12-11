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
const show = (galaxy) =>
  galaxy.map((x) => x.map((y) => (y ? y.toString() : '.')).join('')).join('\n')
const pairsN = (n) => (n * (n - 1)) / 2
const part1 = (input) => {
  let count = 0
  const galaxy = input.map((x) => x.map((y) => (y === '#' ? ++count : 0)))
  const horizontal = []
  const vertical = []
  const height = galaxy.length
  const width = galaxy[0].length
  for (let y = 0; y < height; ++y) {
    let h = 0
    let v = 0
    for (let x = 0; x < width; ++x) {
      if (galaxy[y][x]) h = 1
      if (galaxy[x][y]) v = 1
    }
    horizontal.push((1 - h) * 1)
    vertical.push((1 - v) * 1)
  }
  let adjusted = galaxy
  adjusted = []
  let max = -Infinity
  for (let y = 0; y < height; ++y) {
    adjusted.push([])
    for (let x = 0; x < width; ++x) {
      if (vertical[x]) adjusted.at(-1).push(0)
      adjusted.at(-1).push(galaxy[y][x])
    }
    if (horizontal[y]) adjusted.push([])
    max = Math.max(max, adjusted.at(-1).length)
  }
  for (let y = 0; y < adjusted.length; ++y) {
    for (let x = 0; x < adjusted[0].length; ++x) {
      if (adjusted[y].length === 0)
        adjusted[y] = Array.from({ length: max }).fill(0)
    }
  }
  const pairwise = (list) => {
    if (list.length < 2) return []
    const first = list[0],
      rest = list.slice(1),
      pairs = rest.map((x) => [first, x])
    return pairs.concat(pairwise(rest))
  }
  const pairs = []
  for (let y = 0; y < adjusted.length; ++y) {
    for (let x = 0; x < adjusted[0].length; ++x) {
      const v = adjusted[y][x]
      if (v) pairs.push({ v, x, y })
    }
  }
  console.log(
    pairwise(pairs)
      .map(([a, b]) => distance(a, b))
      .reduce((a, b) => a + b, 0)
  )
}
const input = parse(read())
part1(sample)
part1(input)
