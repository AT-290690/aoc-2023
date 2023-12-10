import { read } from '../../AT/utils.js'
let base = 1
const parse = (input) => {
  const N = input.indexOf('\n')
  const parsed = `${'.'.repeat(N)}\n${input}\n${'.'.repeat(N)}`
    .trim()
    .split('\n')
    .map((x) => {
      base = 1
      return `.${x}.`
        .trim()
        .split('')
        .reverse()
        .map((x) => {
          if (x === '.') {
            base = 1
            return '.'
          } else if (Number.isInteger(+x)) {
            const temp = x * base
            base *= 10
            return temp
          }
          base = 1
          return x
        })
        .reverse()
    })
  return parsed
}
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 1],
]
const adjacent = (Y, X, matrix, rule) => {
  for (const [y, x] of dirs) {
    const dx = X + x
    const dy = Y + y
    if (matrix[dy] && matrix[dy][dx]) {
      const cell = matrix[dy][dx]
      rule(cell, dy, dx)
    }
  }
  return 0
}
const part1 = (matrix) => {
  let sum = 0
  let isValid = 0
  for (let Y = 0; Y < matrix.length; ++Y) {
    let local = 0
    for (let X = 0; X < matrix[0].length; ++X) {
      const current = matrix[Y][X]
      const isInteger = Number.isInteger(current)
      if (!isValid && current !== '.')
        adjacent(
          Y,
          X,
          matrix,
          (cell) => !Number.isInteger(cell) && cell !== '.' && (isValid = 1)
        )
      if (isInteger) local += current
      else {
        if (isValid) sum += local
        local = 0
        isValid = 0
      }
    }
  }
  return sum
}
const part2 = (matrix) => {
  let parts = []
  let isValid = 0
  let local = 0
  let y1 = 0
  let x1 = 0
  for (let Y = 0; Y < matrix.length; ++Y) {
    for (let X = 0; X < matrix[0].length; ++X) {
      const current = matrix[Y][X]
      const isInteger = Number.isInteger(current)
      if (current !== '.') {
        adjacent(Y, X, matrix, (cell, dy, dx) => {
          if (cell === '*') {
            isValid = 1
            y1 = dy
            x1 = dx
          }
        })
      }
      if (isInteger) local += current
      else {
        if (isValid) parts.push([local, y1, x1])
        local = 0
        isValid = 0
      }
    }
  }
  const partition = [
    ...parts
      .reduce((a, b) => {
        const key = `${b.at(1)}-${b.at(2)}`
        if (a.has(key)) a.get(key).push(b.at(0))
        else a.set(key, [b.at(0)])
        return a
      }, new Map())
      .values(),
  ].filter((x) => x.length === 2)
  return partition.reduce((a, [l, r]) => a + l * r, 0)
}
const sample = parse(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`)

const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
