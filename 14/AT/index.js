import { read } from '../../AT/utils.js'

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => [...x])
const sample = parse(`
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`)
const part1 = (input) => {
  const matrix = [...input].map((col) => [...col])
  const H = matrix.length
  const W = matrix[0].length
  const shift = (_y, x, matrix) => {
    for (let y = _y; y < H; ++y) {
      if (matrix[y][x] === '#') break
      else if (matrix[y][x] === 'O') {
        matrix[y][x] = '.'
        return 'O'
      }
    }
  }
  for (let y = 0; y < H; ++y) {
    for (let x = 0; x < W; ++x) {
      const current = matrix[y][x]
      if (current === 'O' || current === '#') continue
      else matrix[y][x] = shift(y, x, matrix) ?? current
    }
  }
  // return matrix.map((x) => x.join('')).join('\n')
  return matrix.reduce(
    (a, x, i) => a + x.reduce((a, b) => a + (b === 'O' ? H - i : 0), 0),
    0
  )
}
const part2 = (input) => {
  const print = (matrix) =>
    console.log(matrix.map((x) => x.join('')).join('\n') + '\n')
  const matrix = [...input].map((col) => [...col])

  const H = matrix.length
  const W = matrix[0].length
  const memo = new Map()
  let count = 0
  const cycle = () => {
    // print(matrix)
    // North
    const key = matrix.map((x) => x.join('')).join('|')
    // if (memo.get(key) === 10) return [count, memo]
    ++count
    if (memo.has(key)) memo.set(key, memo.get(key) + 1)
    else memo.set(key, 0)
    for (let y = 0; y < H; ++y) {
      for (let x = 0; x < W; ++x) {
        const current = matrix[y][x]
        if (current === 'O' || current === '#') continue
        for (let i = y; i < H; ++i) {
          if (matrix[i][x] === '#') break
          else if (matrix[i][x] === 'O') {
            matrix[i][x] = '.'
            matrix[y][x] = 'O'
            break
          }
        }
      }
    }
    // print(matrix)
    // West
    for (let y = 0; y < H; ++y) {
      for (let x = 0; x < W; ++x) {
        const current = matrix[y][x]
        if (current === 'O' || current === '#') continue
        for (let i = x; i < W; ++i) {
          if (matrix[y][i] === '#') break
          else if (matrix[y][i] === 'O') {
            matrix[y][i] = '.'
            matrix[y][x] = 'O'
            break
          }
        }
      }
    }
    // print(matrix)
    // South
    for (let y = H - 1; y >= 0; --y) {
      for (let x = 0; x < W; ++x) {
        const current = matrix[y][x]
        if (current === '.' || current === '#') continue
        for (let i = y + 1; i < H; ++i) {
          if (matrix[i][x] === 'O' || matrix[i][x] === '#') {
            matrix[y][x] = '.'
            matrix[i - 1][x] = 'O'
            break
          } else if (i === H - 1) {
            matrix[y][x] = '.'
            matrix[i][x] = 'O'
            break
          }
        }
      }
    }
    // print(matrix)
    // East
    for (let y = 0; y < H; ++y) {
      for (let x = W - 1; x >= 0; --x) {
        const current = matrix[y][x]
        if (current === '.' || current === '#') continue
        for (let i = x + 1; i <= W; ++i) {
          if (matrix[y][i] === 'O' || matrix[y][i] === '#') {
            matrix[y][x] = '.'
            matrix[y][i - 1] = 'O'
            break
          } else if (i === W - 1) {
            matrix[y][x] = '.'
            matrix[y][i] = 'O'
            break
          }
        }
      }
    }
    return memo
  }
  for (let i = 0; i < 993; ++i) cycle()
  return matrix.reduce(
    (a, x, i) => a + x.reduce((a, b) => a + (b === 'O' ? H - i : 0), 0),
    0
  )
}

const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
// 100071 too high
// 100043 too low
