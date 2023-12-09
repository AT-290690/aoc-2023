const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => x.split(' ').map(Number))
const sample = parse(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`)
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const part1 = (input) => {
  const append = (out, arr) => {
    if (arr.some((x) => x !== 0)) {
      const seq = []
      for (let i = 1; i < arr.length; ++i) seq.push(arr[i] - arr[i - 1])
      out.push(arr)
      append(out, seq)
      return out
    } else {
      out.push(arr)
      return out
    }
  }
  const pyramid = input.map((x) => append([], x))
  const out = pyramid
    .reduce((a, b) => {
      a.push(b.reduce((a, b) => b.at(-1) + a, 0))
      return a
    }, [])
    .reduce((a, b) => a + b, 0)
  return out
}
console.log(part1(sample))
console.log(part1(input))
