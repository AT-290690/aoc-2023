import { Brrr } from 'array-go-brrr'
import { read } from '../../AT/utils.js'

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => [...x])
const sample = parse(`
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`)

const dirs = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
]
const visited = new Set()
let steps = 0
const toKey = (y, x) => `${y}-${x}`
const stack = new Brrr()
const adjacent = (matrix, Y, X) => {
  const current = matrix[Y][X]
  const key = toKey(Y, X)
  if (current !== '#' && !visited.has(key)) {
    stack.append((i) => {
      for (const [y, x] of dirs) {
        const dx = X + x
        const dy = Y + y
        if (matrix[dy] && matrix[dy][dx]) {
          const cell = matrix[dy][dx]
          if (current === '.') {
            if (cell === '#') matrix[Y][X] = i
            visited.add(key)
            adjacent(matrix, dx, dy)
            // matrix[Y][X] = '.'
          }
          //else if (cell === '#' && current !== '#' && current === '.') {
          // matrix[Y][X] = 'O'
          // console.log(matrix.map((x) => x.join('')).join('\n'))
          //}
        }
      }
    })
  }
}

const part1 = (input) => {
  const matrix = [...input].map((x) => [...x])
  const width = matrix[0].length
  const height = matrix.length

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      if (matrix[y][x] === 'S') {
        matrix[y][x] = '.'
        stack.append((i) => adjacent(matrix, y, x))
        break
      }
    }
  }

  for (let i = 0; i < dirs.length * 4; ++i) {
    stack.chop()(i)
  }
  return matrix.map((x) => x.join('')).join('\n')
}

// const input = parse(read())
console.log(part1(sample))
