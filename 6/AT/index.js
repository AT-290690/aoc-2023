const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) =>
      x
        .split(': ')[1]
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((x) => +x.trim())
    )
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const sample = parse(`
Time:      7  15   30
Distance:  9  40  200`)
const part1 = ([times, distances]) => {
  const race = (h, t) => (t - h) * h
  const out = []
  for (let i = 0; i < times.length; ++i) {
    const time = times[i]
    const dist = distances[i]
    out.push(
      Array(time + 1)
        .fill(null)
        .map((_, j) => race(j, time))
        .filter((x) => x > dist).length
    )
  }
  return out.reduce((a, b) => a * b, 1)
}
const part2 = ([times, distances]) => {
  const race = (h, t) => (t - h) * h
  const time = +times.join('')
  const dist = +distances.join('')
  let result = 0
  for (let i = 0, end = time + 1; i < end; ++i)
    if (race(i, time) > dist) ++result
  return result
}
console.log(part1(sample))
console.log(part1(input))
console.log(part1(sample))
console.log(part2(input))
