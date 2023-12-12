import { read } from '../../AT/utils.js'
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [springs, list] = x.split(' ')
      return [springs.split(''), list.split(',').map(Number)]
    })
const sample = parse(`
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`)
const count = (left, right, memo = {}) => {
  const key = left.join('') + right.join('')
  if (key in memo) return memo[key]
  else if (left.length === 0) return right.length === 0 ? 1 : 0
  else if (right.length === 0) return left.includes('#') ? 0 : 1
  const [l] = left
  const [r] = right
  return (memo[key] =
    (l === '.' || l === '?' ? count(left.slice(1), right, memo) : 0) +
    ((l === '#' || l === '?') &&
    r <= left.length &&
    !left.slice(0, r).includes('.') &&
    (r === left.length || left[r] !== '#')
      ? count(left.slice(r + 1), right.slice(1), memo)
      : 0))
}
const part1 = (input) =>
  input.reduce((a, [left, right]) => a + count(left, right), 0)
const part2 = (input) =>
  input
    .map(([left, right]) =>
      Array(5)
        .fill(null)
        .map(() => [left, right])
        .reduce(
          (out, [left, right], i) => {
            out[0].push(...left)
            if (i < 4) out[0].push('?')
            out[1].push(...right)
            return out
          },
          [[], []]
        )
    )
    .reduce((a, [left, right]) => a + count(left, right), 0)
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
