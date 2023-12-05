const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) => {
  // // JavaScript object is not guaranteed to order...
  // const order = {
  //   'seed-to-soil': 0,
  //   'soil-to-fertilizer': 1,
  //   'fertilizer-to-water': 2,
  //   'water-to-light': 3,
  //   'light-to-temperature': 4,
  //   'temperature-to-humidity': 5,
  //   'humidity-to-location': 6,
  // }
  const [lines, ...rest] = input
    .trim()
    .split('\n\n')
    .map((x) => x.trim().split('\n'))
  const [seeds] = lines
  const maps = rest.reduce((a, [name, ...coords]) => {
    a.push({
      name: name.slice(0, -5),
      map: coords.map((x) => x.split(' ').map(Number)),
    })
    return a
  }, [])
  // .sort((a, b) => (order[a.name] > order[b.name] ? 1 : -1))
  return {
    seeds: seeds
      .split('seeds: ')[1]
      .split(' ')
      .reduce((a, b) => {
        a.push(+b)
        return a
      }, []),
    maps,
  }
}
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const sample = parse(`seeds: 79 14 55 13

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

const part1 = ({ seeds, maps }) => {
  const range = []
  for (const seed of seeds) {
    let temp = seed
    for (const { name, map } of maps) {
      for (const [start, end, length] of map) {
        if (temp >= end && temp < end + length) {
          temp = temp - end + start
          break
        }
      }
    }
    range.push(temp)
  }
  return Math.min(...range)
}
const part2 = ({ seeds, maps }) => {
  seeds = seeds.reduce((a, b, i) => {
    if (i % 2 === 0) a.push([b])
    else {
      const prev = a.at(-1)
      prev.push(prev[0] + b - 1)
    }
    return a
  }, [])
  let min = Infinity
  for (const [start, end] of seeds) {
    for (let seed = start; seed < end; ++seed) {
      let temp = seed
      let tName = ''
      for (const { name, map } of maps) {
        tName = name
        for (const [start, end, length] of map) {
          if (temp >= end && temp < end + length) {
            temp = temp - end + start
            if (tName === 'humidity-to-location' && temp < min) min = temp
            break
          }
        }
      }
      if (tName === 'humidity-to-location' && temp < min) min = temp
    }
  }
  return min
}
console.log(part1(sample))
console.log(part1(input))
// console.log(part2(sample))
// console.log(part1(sample))
// console.log(part1(input))
console.log(part2(sample))
// console.log(part2(input))
// too high 88151870
// too high 104847961
// 12311319
// 12311318 too high
