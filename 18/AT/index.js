import { read } from '../../AT/utils.js'
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [dir, n, color] = x.split(' ')
      return [dir, +n, color.replace('(', '').replace(')', '').replace('#', '')]
    })
const sample = parse(`
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
U 2 (#7a21e3)`)
const part1 = (input) => {
  // const bounds = {
  //   top: Infinity,
  //   bottom: -Infinity,
  //   left: Infinity,
  //   right: -Infinity,
  // }
  const matrix = new Map()
  let cursor = { y: 0, x: 0 }
  const toKey = (y, x) => `${y}|${x}`
  for (const [direction, steps] of input) {
    switch (direction) {
      case 'R':
        for (let i = cursor.x; i < cursor.x + steps; ++i)
          matrix.set(toKey(cursor.y, i), [cursor.y, i])
        cursor.x += steps
        break
      case 'L':
        for (let i = cursor.x; i >= cursor.x - steps; --i)
          matrix.set(toKey(cursor.y, i), [cursor.y, i])
        cursor.x -= steps
        break
      case 'U':
        for (let i = cursor.y; i >= cursor.y - steps; --i)
          matrix.set(toKey(i, cursor.x), [i, cursor.x])
        cursor.y -= steps
        break
      case 'D':
        for (let i = cursor.y; i < cursor.y + steps; ++i)
          matrix.set(toKey(i, cursor.x), [i, cursor.x])
        cursor.y += steps
        break
    }
    // bounds.top = Math.min(bounds.top, cursor.y)
    // bounds.bottom = Math.max(bounds.bottom, cursor.y)
    // bounds.left = Math.min(bounds.left, cursor.x)
    // bounds.right = Math.max(bounds.right, cursor.x)
  }
  // bounds.bottom = Math.abs(bounds.top) + Math.abs(bounds.bottom)
  // bounds.top = Math.abs(bounds.top)
  // bounds.right = Math.abs(bounds.left) + Math.abs(bounds.right)
  // bounds.left = Math.abs(bounds.left)
  const points = [...matrix.values()]
  let acc = 0
  for (let i = 1; i < points.length; ++i) {
    const [y1, x1] = points[i - 1]
    const [y2, x2] = points[i]
    acc += x1 * y2 - x2 * y1
  }
  return (acc + points.length) / 2 + 1
}

const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
