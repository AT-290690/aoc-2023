const { readFileSync } = require('fs')
const words = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const dir = __dirname.split('/')
dir.pop()
const parse = (input) => input.trim().split('\n')
const offset = 'a'.charCodeAt(0)
const part1 = (input) =>
  input
    .map((str) => {
      const num = [...str]
        .filter((char) => char.charCodeAt(0) < offset)
        .map(Number)
      return +`${num.at(0)}${num.at(-1)}`
    })
    .reduce((a, b) => a + b, 0)

const part2 = (input) =>
  input
    .map((str) => {
      let min = Infinity
      let max = -Infinity
      let left = 0
      let right = 0
      for (const word of words) {
        const l = str.indexOf(word)
        if (l !== -1 && l < min) {
          left = word
          min = l
        }
        const r = str.lastIndexOf(word)
        if (r !== -1 && r > max) {
          right = word
          max = r
        }
      }
      if (left)
        str = `${str.slice(0, min)}${words.indexOf(left) + 1}${str.slice(
          min + 1
        )}`
      if (right)
        str = `${str.slice(0, max)}${words.indexOf(right) + 1}${str.slice(
          max + 1
        )}`
      const arr = [...str].filter((char) => char.charCodeAt(0) < offset)
      return +`${arr.at(0)}${arr.at(-1)}`
    })
    .reduce((a, b) => a + b, 0)

const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
console.log(
  part1(
    parse(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`)
  )
)
console.log(part1(input))
console.log(
  part2(
    parse(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)
  )
)
console.log(part2(input))
