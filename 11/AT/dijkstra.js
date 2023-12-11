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
const directions = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],

  // [0, 1],
  // [1, 0],
  // [-1, 0],
  // [0, -1],
  // [1, -1],
  // [-1, 1],
  // [-1, -1],
  // [1, 1],
]
const coordToKey = (y, x) => `${y}-${x}`
const keyToCoord = (key) => key.split('-').map(Number)
const adjacent = (Y, X, matrix) => {
  const neib = []
  for (const [y, x] of directions) {
    const x1 = X + x
    const y1 = Y + y
    if (matrix[y1] && matrix[y1][x1]) {
      if (matrix[y1][x1] >= matrix[Y][X] - 1) neib.push(coordToKey(y1, x1))
    }
  }
  return neib
}
const dijkstra = (graph, source, target) => {
  let queue = []
  const visited = graph.map((x) => x.map(() => 0))
  const dist = new Map()
  const prev = new Map()
  const height = graph.length
  const width = graph[0].length
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const key = coordToKey(y, x)
      dist.set(key, Infinity)
      queue.push(key)
    }
  }
  dist.set(coordToKey(source.y, source.x), 0)
  dist.set(coordToKey(target.y, target.x), 10)
  while (queue.length) {
    let shortest = undefined
    for (const current of queue) {
      if (shortest == undefined || dist.get(current) < dist.get(shortest))
        shortest = current
    }

    const [y, x] = keyToCoord(shortest)
    if (y === target.y && x === target.x) {
      return dist.get(shortest)
    }

    queue = queue.filter((x) => x !== shortest)
    for (const vertex of adjacent(y, x, graph)) {
      if (queue.includes(vertex)) {
        const alt = dist.get(shortest) + 1
        if (alt < dist.get(vertex)) {
          dist.set(vertex, alt)
          prev.set(vertex, shortest)
          visited[y][x] = 1
        }
      }
    }
  }
}
const show = (galaxy) =>
  galaxy.map((x) => x.map((y) => (y ? y.toString() : '.')).join('')).join('\n')

const part1 = (input) => {
  let count = 0
  const galaxy = input.map((x) => x.map((y) => (y === '#' ? ++count : 0)))
  // console.log(galaxy.items)
  console.log(show(galaxy))
  // console.log(galaxy[0][3])
  // console.log(galaxy[1][7])
  console.log(dijkstra(galaxy, { y: 0, x: 3 }, { y: 1, x: 7 }))
}
// const input = parse(read())
part1(sample)
