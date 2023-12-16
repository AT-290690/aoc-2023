import { read } from '../../AT/utils.js'
const escape = (ch) => {
  switch (ch) {
    case '\\':
      return '['
    default:
      return ch
  }
}
const keep = (ch) => {
  switch (ch) {
    case '.':
      return '.'
    case '/':
      return ']'
    case '|':
      return '|'
    case '-':
      return '-'
    default:
      return ch
  }
}
const parse = (input) => {
  let escaped = ''
  for (let i = 0; i < input.length; ++i)
    escaped += input[i] === '\\' ? escape(input[i]) : keep(input[i])
  return escaped
    .trim()
    .split('\n')
    .map((x) => [...x])
}
const sample = parse(read('sample'))
const part1 = (input) => {
  const isAbove = (light, tile) => light.y < tile.y
  const isBelow = (light, tile) => light.y > tile.y
  const isRight = (light, tile) => light.x > tile.x
  const isLeft = (light, tile) => light.x < tile.x
  const isVertical = (light, tile) => light.x === tile.x
  const isHorizontal = (light, tile) => light.y === tile.y
  const track = new Set()
  const visited = new Set()
  const toKey = ({ y, x }) => `${y}-${x}`
  const fromKey = (key) => {
    const k = key.split('-')
    return { y: k[0], x: k[1] }
  }
  const isInBounds = ({ y, x }) => !!matrix[y] && !!matrix[y][x]
  const matrix = input
  let count = 0
  const beam = (y, x, dy, dx) => {
    const Y = y + dy
    const X = x + dx
    const light = { y, x }
    const tile = { y: Y, x: X }
    track.add(toKey(light))
    if (!isInBounds(tile)) return
    const key = toKey(tile)
    const IS_VERTICAL = isVertical(light, tile)
    const IS_HORIZONTAL = isHorizontal(light, tile)
    const IS_LEFT = isLeft(light, tile)
    const IS_RIGHT = isRight(light, tile)
    const IS_ABOVE = isAbove(light, tile)
    const IS_BELOW = isBelow(light, tile)
    switch (matrix[tile.y][tile.x]) {
      // If the beam encounters a mirror (/ or \), the beam is reflected 90 degrees depending on the angle of the mirror.
      case '[':
        // a rightward-moving beam that encounters a \ mirror would continue downward from the mirror's column.
        if (IS_LEFT) beam(Y, X, 1, 0)
        else if (IS_RIGHT) beam(Y, X, -1, 0)
        else if (IS_ABOVE) beam(Y, X, 0, 1)
        else if (IS_BELOW) beam(Y, X, 0, -1)
        // else if (IS_BELOW) beam(Y, X, 0, -1)
        // else if (IS_ABOVE) beam(Y, X, 0, 1)
        // else beam(Y, X, dy, dx)
        break
      case ']':
        // a rightward-moving beam that encounters a / mirror would continue upward in the mirror's column
        if (IS_LEFT) beam(Y, X, -1, 0)
        else if (IS_RIGHT) beam(Y, X, 1, 0)
        else if (IS_ABOVE) beam(Y, X, 0, -1)
        else if (IS_BELOW) beam(Y, X, 0, 1)
        // else if (IS_BELOW) beam(Y, X, 0, 1)
        // else if (IS_ABOVE) beam(Y, X, 0, -1)
        // else beam(Y, X, dy, dx)
        break
      // If the beam encounters the pointy end of a splitter (| or -), the beam passes through the splitter as if the splitter were empty space.
      // For instance, a rightward-moving beam that encounters a - splitter would continue in the same direction.
      // If the beam encounters the flat side of a splitter (| or -), the beam is split into two beams going in each of the two directions the splitter's pointy ends are pointing.
      case '|':
        // a rightward-moving beam that encounters a | splitter would split into two beams:
        // one that continues upward from the splitter's column and one that continues downward from the splitter's column.
        if (IS_HORIZONTAL && !visited.has(key)) {
          visited.add(key)
          beam(Y, X, -1, 0)
          beam(Y, X, 1, 0)
        } else if (IS_VERTICAL) beam(Y, X, dy, dx)
        break
      case '-':
        if (IS_VERTICAL && !visited.has(key)) {
          visited.add(key)
          beam(Y, X, 0, -1)
          beam(Y, X, 0, 1)
        } else if (IS_HORIZONTAL) beam(Y, X, dy, dx)
        break
      case '.':
        // If the beam encounters empty space (.), it continues in the same direction.
        beam(Y, X, dy, dx)
        break
      // default:
      // The beam enters in the top-left corner from the left and heading to the right.
      // beam(Y, X, 0, 1)
      // break
    }
  }
  if (matrix[0][0] === '[') beam(0, 0, -1, 0)
  else if (matrix[0][0] === ']') beam(0, 0, 1, 0)
  else {
    beam(0, 0, 0, 1)
  }

  // for (const { y, x } of [...track.values()].map(fromKey)) matrix[y][x] = '#'
  // console.log(matrix.map((x) => x.join('')).join('\n'))
  console.log(track.size)
  // const m = [...track.values()].map(fromKey).reverse()
  // const print = () => {
  //   if (m.length) {
  //     const { y, x } = m.pop()
  //     let temp = matrix[y][x]
  //     matrix[y][x] = '#'
  //     console.clear()
  //     console.log(matrix.map((x) => x.join('')).join('\n'))
  //     matrix[y][x] = temp
  //     setTimeout(print, 50)
  //   }
  // }
  // console.clear()
  // print()
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
