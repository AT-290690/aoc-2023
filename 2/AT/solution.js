const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [N, cubes] = x.split(': ')
      return [
        +N.split('Game ')[1],
        cubes.split('; ').map((hand) =>
          hand.split(', ').map((x) => {
            const [i, color] = x.split(' ')
            return [+i, color]
          })
        ),
      ]
    })

const rules = new Map([
  ['red', 12],
  ['green', 13],
  ['blue', 14],
])

const part1 = (input) =>
  input
    .filter(([, hands]) =>
      hands.every((hand) => !hand.some(([n, color]) => rules.get(color) < n))
    )
    .map(([x]) => x)
    .reduce((a, b) => a + b, 0)

const part2 = (input) =>
  input
    .reduce((acc, [, hands]) => {
      acc.push(
        hands.reduce(
          (bounds, hand) => {
            // hand.reduce(([n, color]) => n, Infinity)
            return hand.reduce((bounds, [n, color]) => {
              if (bounds.get(color) < n) bounds.set(color, n)
              return bounds
            }, bounds)
          },
          new Map([
            ['red', -Infinity],
            ['green', -Infinity],
            ['blue', -Infinity],
          ])
        )
      )
      return acc
    }, [])
    .map((x) => [...x.values()].reduce((a, b) => a * b, 1))
    .reduce((a, b) => a + b, 0)
const sample = parse(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)
const input = parse(readFileSync(`${dir.join('/')}/input.txt`, 'utf-8'))
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
