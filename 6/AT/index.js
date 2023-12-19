import { read } from '../../AT/utils.js'
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
const parse2 = (input) =>
  parse(input).map((x) => [+x.reduce((a, b) => a + b, '')])
const input = read()
const sample = `
Time:      7  15   30
Distance:  9  40  200`
const part1 = ([times, distances]) => {
  let out = 1
  for (let i = 0; i < times.length; ++i) {
    const time = times[i]
    const dist = distances[i]
    let result = 0
    for (let charge = 0, end = time; charge < end; ++charge)
      if ((time - charge) * charge > dist) ++result
    out *= result
  }
  return out
}
const part2 = part1
console.log(part1(parse(sample)))
console.log(part1(parse(input)))
console.log(part2(parse2(sample)))
console.log(part2(parse2(input)))
