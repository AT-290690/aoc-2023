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
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const part1Rec = ([dirs, adj]) => {
  const move = (current, target, step = 0) => {
    const node = adj[current][dirs[step % dirs.length]]
    return node === target ? step : move(node, target, ++step)
  }
  return move('AAA', 'ZZZ') + 1
}

const part1 = ([dirs, adj]) => {
  let current = 'AAA'
  let target = 'ZZZ'
  let node
  let step = 0
  let count = 0
  while (node !== target) {
    ++count
    node = adj[current][dirs[step]]
    step = (step + 1) % dirs.length
    current = node
  }
  return count
}

console.log(part1(sample1))
console.log(part1(sample2))
console.log(part1Rec(sample1))
console.log(part1Rec(sample2))
console.log(part1(input))
