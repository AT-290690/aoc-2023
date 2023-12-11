import { Brrr } from 'array-go-brrr'
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
]
const coordToKey = (y, x) => `${y}-${x}`
const keyToCoord = (key) => key.split('-').map(Number)
const adjacent = (Y, X, matrix) => {
  const neib = new Brrr()
  for (const [y, x] of directions) {
    const x1 = X + x
    const y1 = Y + y
    if (matrix.isInBounds(y1) && matrix.at(y1).isInBounds(x1)) {
      if (matrix.at(y1).at(x1) >= matrix.at(Y).at(X) - 1)
        neib.append(coordToKey(y1, x1))
    }
  }
  return neib
}
let count = 0

const dijkstra = (graph, source, target) => {
  let queue = new Brrr()
  const visited = graph.map((x) => x.copy().map(() => 0))
  const dist = new Map()
  const prev = new Map()
  graph.scan((col, y) =>
    col.scan((_, x) => {
      const key = coordToKey(y, x)
      dist.set(key, Infinity)
      queue.append(key)
    })
  )
  dist.set(coordToKey(source.y, source.x), 0)
  while (!queue.isEmpty()) {
    let shortest = undefined
    for (const current of queue) {
      console.log(dist.get(current), dist.get(shortest))
      if (shortest == undefined || dist.get(current) < dist.get(shortest))
        shortest = current
    }
    ++count
    if (count > 5) return
  }
  const point = keyToCoord(shortest)
  if (point.y === target.y && point.x === target.x) return dist.get(shortest)
  queue = queue.filter((x) => x !== shortest)
  adjacent(point.y, point.x, graph).scan((vertex) => {
    if (queue.includes(vertex)) {
      const alt = dist.get(shortest) + 1
      if (alt < dist.get(vertex)) {
        dist.set(vertex, alt)
        prev.set(vertex, shortest)
        visited.at(point.y).set(point.x, 1)
      }
    }
  })
}
const show = (galaxy) =>
  galaxy.items
    .map((x) => x.map((y) => (y ? y.toString() : '.')).join(''))
    .join('\n')

const part1 = (input) => {
  let count = 0
  const galaxy = Brrr.from(
    input.map((x) => Brrr.from(x.map((y) => (y === '#' ? ++count : 0))))
  )
  // console.log(galaxy.items)
  console.log(show(galaxy))
  console.log(dijkstra(galaxy, { y: 0, x: 3 }, { y: 1, x: 8 }))
}
// const input = parse(read())
part1(sample)
