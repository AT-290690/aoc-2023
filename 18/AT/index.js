import { read } from '../../AT/utils.js'
const parse1 = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [dir, n, color] = x.split(' ')
      return [dir, +n, color.replace('(', '').replace(')', '').replace('#', '')]
    })
const parse2 = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [_, _1, color] = x.split(' ')
      const parsed = color.replace('(', '').replace(')', '').replace('#', '')
      const last = +parsed[parsed.length - 1]
      // 0 means R, 1 means D, 2 means L, and 3 means U
      const map = ['R', 'D', 'L', 'U']
      const n = parseInt(parsed.slice(0, -1), 16)
      const dir = map[last]
      return [dir, n]
    })
const sample = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`
const part1 = (input) => {
  let cursor = { y: 0, x: 0 }
  const points = []
  let edge = 0
  for (const [direction, steps] of input) {
    const point = [cursor.y, cursor.x]
    points.push(point)
    edge += steps
    switch (direction) {
      case 'R':
        cursor.x += steps
        break
      case 'L':
        cursor.x -= steps
        break
      case 'U':
        cursor.y -= steps
        break
      case 'D':
        cursor.y += steps
        break
    }
  }
  let acc = 0
  for (let i = 1; i < points.length; ++i) {
    const [y1, x1] = points[i - 1]
    const [y2, x2] = points[i]
    acc += x1 * y2 - x2 * y1
  }
  return (acc + edge) / 2 + 1
}
const part2 = part1
const input = read()
console.log(part1(parse1(sample)))
console.log(part1(parse1(input)))
console.log(part2(parse2(sample)))
console.log(part2(parse2(input)))
