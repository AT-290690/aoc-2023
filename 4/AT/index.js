const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [n, cards] = x.split(': ')
      return [
        +n.split(' ')[1],
        cards.split('|').map((x) =>
          x
            .split(' ')
            .map((x) => x.trim())
            .filter(Boolean)
            .map(Number)
        ),
      ]
    })
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const sample = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
const part1 = (input) =>
  input.reduce((a, [index, [left, right]]) => {
    const dub = new Set(right)
    let matched = 0
    let reward = 1
    for (const card of left) {
      if (dub.has(card)) {
        matched += 1
        a += reward
        if (matched > 1) reward *= 2
      }
    }
    return a
  }, 0)
const inp = parse(sample)
console.log(part1(inp))
console.log(part1(input))
