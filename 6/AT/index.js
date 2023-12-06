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
  let out = 1
  for (let i = 0; i < times.length; ++i) {
    const time = times[i]
    const dist = distances[i]
    let result = 0
    for (let i = 0, end = time + 1; i < end; ++i)
      if (race(i, time) > dist) ++result
    out *= result
  }
  return out
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
console.log(part2(sample))
console.log(part2(input))
