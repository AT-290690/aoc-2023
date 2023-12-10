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

const part1 = (input) => {
  const start = { x: 0, y: 0 }

  const MAP = input.map((row, y) =>
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
  )
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

  const compass = (animal, matrix, visited, step) => {
    for (const [y, x] of dirs) {
      const dx = animal.x + x
      const dy = animal.y + y
      if (matrix[dy] && matrix[dy][dx]) {
        const pipe = matrix[dy][dx]
        const key = `${pipe.y}-${pipe.x}`
        if (pipe.c !== '.' && !visited.has(key) && match(animal, pipe)) {
          animal.y = pipe.y
          animal.x = pipe.x
          animal.c = pipe.c
          MAP[animal.y][animal.x].v = step
          visited.add(key)
          return pipe
        }
      }
    }
    return animal
  }

  let rabbit = initial({ ...start }, MAP)
  let turtle = initial({ ...start }, MAP)

  const visitedTurtle = new Set()
  const visitedRabbit = new Set()
  let step = 1
  while (true) {
    ++step
    compass(turtle, MAP, visitedTurtle, step)
    compass(rabbit, MAP, visitedRabbit, step)
    compass(rabbit, MAP, visitedRabbit, step)
    if (rabbit.x === turtle.x && rabbit.y === turtle.y) return step / 2
  }
  // console.log(
  //   MAP.map((x) => x.map((y) => (y.v ? '+' : y.c)).join('')).join('\n')
  // )
}

const input = parse(read())
console.log(part1(sample1))
console.log(part1(sample2))
console.log(part1(input))
