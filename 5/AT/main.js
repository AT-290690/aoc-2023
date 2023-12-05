const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) => {
  const [lines, ...rest] = input
    .trim()
    .split('\n\n')
    .map((x) => x.trim().split('\n'))
  const [seeds] = lines
  const maps = rest.reduce((a, [map, ...coords]) => {
    a.set(
      map.slice(0, -5),
      coords.map((x) => x.split(' ').map(Number))
    )
    return a
  }, new Map())
  return {
    seeds: seeds
      .split('seeds: ')[1]
      .split(' ')
      .reduce((a, b) => {
        a[b] = +b
        return a
      }, {}),
    maps,
  }
}
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const sample = parse(`
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`)
const sample2 = parse(`
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48`)
const toRange = (offset, length) =>
  Array.from({ length })
    .fill(null)
    .map((_, i) => offset + i)
const toBoundsEnd = (offset, length) => offset + length - 1
const part1 = ({ seeds, maps }) => {
  const correspondences = { 'seed-to-seed': seeds }
  let prev = 'seed-to-seed'
  for (const [key, source] of maps) {
    correspondences[key] = []
    const corr = correspondences[prev]
    for (const current of source) {
      const [start, end] = current
      const length = current.pop()
      const obj = {}
      correspondences[key].push(obj)
      const A = { left: start, right: toBoundsEnd(start, length) }
      const B = { left: end, right: toBoundsEnd(end, length) }
      for (const i in corr) {
        const num = corr[i]
        if (num >= A.left && num <= A.right) {
          obj[num] = num + Math.abs(A.left - B.left)
        } else {
          obj[num] = num
        }
      }
    }
    prev = key
    correspondences[key] = correspondences[key].reduce(
      (a, b) => ({ ...a, ...b }),
      {}
    )
  }
  console.log(correspondences)

  // const output = []
  // for (const seed in seeds) {
  //   let left = seed
  //   const obj = { seed: seeds[seed] }
  //   for (const corr in correspondences) {
  //     const right = correspondences[corr]
  //     console.error.l
  //     const current = right[left] ?? +left
  //     obj[corr.split('-to-')[1]] = current
  //     left = current
  //   }
  //   output.push(obj)
  // }

  // return Math.min(...output.map(({ location }) => location))
}

console.log(part1(sample))
// console.log(part1(input))
