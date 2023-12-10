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
const input1 = parse(read())
const input2 = parse2(read())
const sample1 = parse(`
Time:      7  15   30
Distance:  9  40  200`)
const sample2 = parse2(`
Time:      7  15   30
Distance:  9  40  200`)
const solve = ([times, distances]) => {
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
console.log(solve(sample1))
console.log(solve(input1))
console.log(solve(sample2))
console.log(solve(input2))
