const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) => {
  const [[path], list] = input
    .trim()
    .split('\n\n')
    .map((x) => x.split('\n'))
  const dirs = [...path].map((x) => (x === 'R' ? 1 : 0))
  const adj = list.map((x) => x.split(' = '))
  return [
    dirs,
    adj.reduce((a, [key, elements]) => {
      a[key] = elements.replace('(', '').replace(')', '').split(', ')
      return a
    }, {}),
  ]
}

const sample1 = parse(
  `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
)
const sample2 = parse(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ`)
const sample3 = parse(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
// const tco =
//   (fn) =>
//   (...args) => {
//     let result = fn(...args)
//     while (typeof result === 'function') result = result()
//     return result
//   }
// const part1Rec = ([dirs, adj]) => {
//   const move = tco(
//     (rec = (source, target, step = 0) => {
//       const node = adj[source][dirs[step % dirs.length]]
//       return node === target ? step : () => rec(node, target, ++step)
//     })
//   )
//   return move('AAA', 'ZZZ') + 1
// }

// const part2Slow = ([dirs, adj]) => {
//   const keys = Object.keys(adj)
//   let sources = keys.filter((x) => x[x.length - 1] === 'A')
//   const target = 'Z'
//   let nodes = sources
//   let step = 0
//   let count = 0
//   while (nodes.some((source) => source[source.length - 1] !== target)) {
//     ++count
//     const direction = dirs[step]
//     nodes = sources.map((source) => adj[source][direction])
//     step = (step + 1) % dirs.length
//     sources = nodes
//   }
//   return count
// }

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
const lcm = (a, b) => (a / gcd(a, b)) * b
const part1 = ([dirs, adj]) => {
  let source = 'AAA'
  let target = 'ZZZ'
  let node
  let step = 0
  let count = 0
  while (node !== target) {
    ++count
    node = adj[source][dirs[step]]
    step = (step + 1) % dirs.length
    source = node
  }
  return count
}
const part2 = ([dirs, adj]) =>
  Object.keys(adj)
    .filter((x) => x[x.length - 1] === 'A')
    .map((source) => {
      let count = 0
      let node = source
      let step = 0
      while (node[node.length - 1] !== 'Z') {
        ++count
        node = adj[source][dirs[step]]
        step = (step + 1) % dirs.length
        source = node
      }
      return count
    })
    .reduce(lcm, 1)
console.log(part1(sample1))
console.log(part1(sample2))
console.log(part1(input))
console.log(part2(sample2))
console.log(part2(sample3))
console.log(part2(input))
