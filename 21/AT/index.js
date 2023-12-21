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
const sample3 = parse(`
...........
.....---.-.
.--.--..-.
..-.-...-..
....-.-....
.--..S----.
.--..-...-.
.......--..
.--.-.----.
.--..--.--.
...........
`)
const sample2 = parse(`
.....................#
......................
.#....................
......................
......................
...........S..........
......................
......................
.#....................
......................
...................#..
`)

const dirs = [
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, 0],
]
const toKey = (y, x) => `${y}-${x}`
const part1 = (input) => {
  const matrix = [...input].map((x) => [...x])
  const width = matrix[0].length
  const height = matrix.length
  const target = 64
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      if (matrix[y][x] === 'S') {
        const visited = new Set()
        const steps = new Set()
        const queue = new Brrr()
        const key = toKey(y, x)
        visited.add(key)
        steps.add(key)
        queue.append([y, x, target])
        matrix[y][x] = '.'
        while (!queue.isEmpty()) {
          const [y, x, step] = queue.chop()
          if (step % 2 === 0) steps.add(toKey(y, x))
          if (step === 0) continue
          for (const [y1, x1] of dirs) {
            const dx = x + x1
            const dy = y + y1
            if (matrix[dy] && matrix[dy][dx]) {
              const cell = matrix[dy][dx]
              const key = toKey(dy, dx)
              if (cell === '.' && !visited.has(key)) {
                queue.append([dy, dx, step - 1])
                visited.add(key)
              }
            }
          }
        }

        // for (const key of steps) {
        //   const [y, x] = key.split('-')
        //   matrix[y][x] = 'O'
        // }
        // return matrix.map((x) => x.join('')).join('\n')
        return steps.size
      }
    }
  }
}

const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
