import { read } from '../../AT/utils.js'

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => [...x])

const sample0 = parse(
  `.....
.F-7.
.|.|.
.L-J.
.....`
)
const sample1 = parse(
  `.....
.S-7.
.|.|.
.L-J.
.....`
)
const sample2 = parse(
  `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
)
const sample3 = parse(`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`)
const inputToMatrix = (input) => {
  const start = { x: 0, y: 0 }
  return {
    start,
    matrix: input.map((row, y) =>
      row.map((col, x) => {
        switch (col) {
          case 'S':
            start.x = x
            start.y = y
            return { x, y, c: col, v: 1 }
          /*
    | is a vertical pipe connecting north and south.
    - is a horizontal pipe connecting east and west.
    L is a 90-degree bend connecting north and east.
    J is a 90-degree bend connecting north and west.
    7 is a 90-degree bend connecting south and west.
    F is a 90-degree bend connecting south and east.
    . is ground; there is no pipe in this tile.
    S is the starting position of the rat; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
  */
          case '|':
            return { x, y, c: col, v: 0 }
          case '-':
            return { x, y, c: col, v: 0 }
          case 'L':
            return { x, y, c: col, v: 0 }
          case 'J':
            return { x, y, c: col, v: 0 }
          case 'F':
            return { x, y, c: col, v: 0 }
          case '7':
            return { x, y, c: col, v: 0 }
          case '.':
            return { x, y, c: col, v: 0 }
        }
      })
    ),
  }
}

const isAbove = (animal, pipe) => animal.y < pipe.y
const isBelow = (animal, pipe) => animal.y > pipe.y
const isRight = (animal, pipe) => animal.x > pipe.x
const isLeft = (animal, pipe) => animal.x < pipe.x
const isVertical = (animal, pipe) => animal.x === pipe.x
const isHorizontal = (animal, pipe) => animal.y === pipe.y
const match = (animal, pipe) => {
  const IS_VERTICAL = isVertical(animal, pipe)
  const IS_HORIZONTAL = isHorizontal(animal, pipe)
  const IS_LEFT = isLeft(animal, pipe)
  const IS_RIGHT = isRight(animal, pipe)
  const IS_ABOVE = isAbove(animal, pipe)
  const IS_BELOW = isBelow(animal, pipe)

  switch (animal.c) {
    case '|':
      switch (pipe.c) {
        case '|':
          return IS_VERTICAL
        case 'L':
        case 'J':
          return IS_VERTICAL && IS_ABOVE
        case '7':
        case 'F':
          return IS_VERTICAL && IS_BELOW
      }
      break
    case '-':
      switch (pipe.c) {
        case '-':
          return IS_HORIZONTAL
        case 'L':
        case 'F':
          return IS_HORIZONTAL && IS_RIGHT
        case 'J':
        case '7':
          return IS_HORIZONTAL && IS_LEFT
      }
      break
    case 'L':
      switch (pipe.c) {
        case '|':
          return IS_VERTICAL && IS_BELOW
        case '-':
          return IS_HORIZONTAL && IS_LEFT
        case '7':
          return (IS_HORIZONTAL && IS_LEFT) || (IS_VERTICAL && IS_BELOW)
        case 'F':
          return IS_VERTICAL && IS_BELOW
        case 'J':
          return IS_HORIZONTAL && IS_LEFT
      }
      break
    case 'F':
      switch (pipe.c) {
        case '|':
          return IS_VERTICAL && IS_ABOVE
        case '-':
          return IS_HORIZONTAL && IS_LEFT
        case 'L':
          return IS_VERTICAL && IS_ABOVE
        case '7':
          return IS_HORIZONTAL && IS_LEFT
        case 'J':
          return (IS_HORIZONTAL && IS_LEFT) || (IS_VERTICAL && IS_ABOVE)
      }
      break
    case 'J':
      switch (pipe.c) {
        case '|':
          return IS_VERTICAL && IS_BELOW
        case '-':
          return IS_HORIZONTAL && IS_RIGHT
        case '7':
          return IS_VERTICAL && IS_BELOW
        case 'F':
          return (IS_HORIZONTAL && IS_RIGHT) || (IS_VERTICAL && IS_BELOW)
        case 'L':
          return IS_HORIZONTAL && IS_RIGHT
      }
      break
    case '7':
      switch (pipe.c) {
        case '|':
          return IS_VERTICAL && IS_ABOVE
        case '-':
          return IS_HORIZONTAL && IS_RIGHT
        case 'L':
          return (IS_VERTICAL && IS_ABOVE) || (IS_HORIZONTAL && IS_RIGHT)
        case 'F':
          return IS_HORIZONTAL && IS_RIGHT
        case 'J':
          return IS_VERTICAL && IS_ABOVE
      }
  }
  return false
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
const initial = (animal, matrix) => {
  const neib = []
  for (const [y, x] of dirs) {
    const dx = animal.x + x
    const dy = animal.y + y
    if (matrix[dy] && matrix[dy][dx]) {
      const pos = matrix[dy][dx]
      if (pos.c !== '.') {
        neib.push(pos)
      }
    }
  }
  const pipe = ['F', '|', '7', 'J', 'L', '-'].find(
    (c) => neib.reduce((a, pos) => a + match({ ...animal, c }, pos), 0) >= 2
  )
  animal.c = pipe
  return animal
}
const toKey = ({ y, x }) => `${y}-${x}`
const compass = (animal, matrix, visited) => {
  for (const [y, x] of dirs) {
    const dx = animal.x + x
    const dy = animal.y + y
    if (matrix[dy] && matrix[dy][dx]) {
      const pipe = matrix[dy][dx]
      const key = toKey(pipe)
      if (pipe.c !== '.' && !visited.has(key) && match(animal, pipe)) {
        animal.y = pipe.y
        animal.x = pipe.x
        animal.c = pipe.c
        matrix[animal.y][animal.x].v = 1
        visited.add(key)
        return pipe
      }
    }
  }
  return animal
}
const race = ({ start, matrix }) => {
  const rabbit = initial({ ...start }, matrix)
  const turtle = initial({ ...start }, matrix)
  const visitedTurtle = new Set()
  const visitedRabbit = new Set()
  let step = 1
  while (true) {
    ++step
    compass(turtle, matrix, visitedTurtle, step)
    compass(rabbit, matrix, visitedRabbit, step)
    compass(rabbit, matrix, visitedRabbit, step)
    if (rabbit.x === turtle.x && rabbit.y === turtle.y) return step / 2
  }
}
const part1 = (input) => race(inputToMatrix(input))

const sample4 = parse(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`)
const sample5 = parse(`
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`)
const sample6 = parse(`
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`)
const sample7 = parse(`..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
.........`)
const part2 = (input) => {
  const { matrix, start } = inputToMatrix(input)
  race({ matrix, start })
  const width = matrix[0].length
  const height = matrix.length
  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      const row = matrix[i][j]
      if (!row) continue
      if (row.v === 0) {
        row.in = [0, 0]
        for (let y = row.y; y < height; ++y) {
          const cross = matrix[y][j]
          if (!cross) continue
          const char = cross.c
          if (cross.v === 1)
            if (char === '-' || char === '7' || char === 'J') row.in[0] += 1
        }
        for (let y = row.y; y >= 0; --y) {
          const cross = matrix[y][j]
          if (!cross) continue
          const char = cross.c
          if (cross.v === 1)
            if (char === '-' || char === 'L' || char === 'F') row.in[1] += 1
        }
      }
    }
  }

  return matrix.flatMap((x) => x.filter((y) => y.in?.every((x) => x % 2 !== 0)))
    .length
}
const input = parse(read())
console.log(part1(sample1))
console.log(part1(sample2))
console.log(part1(input))
console.log(part1(sample3))
console.log(part1(sample4))
console.log(part1(sample5))
console.log(part1(sample6))
console.log(part2(sample7))
console.log(part2(input))
