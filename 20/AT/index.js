import { Brrr } from 'array-go-brrr'
import { read } from '../../AT/utils.js'

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [req, res] = x.split(' -> ')
      return [req, res.split(', ')]
    })
const DEBUG = false
const print = (...logs) => (DEBUG ? console.log(...logs) : 0)
const sample = parse(`
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`)
const sample2 = parse(`
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`)
const part1 = (input) => {
  const Broadcaster = Symbol('*')
  const FlipFlop = Symbol('%')
  const Conjuction = Symbol('&')
  const None = Symbol('-')

  const tree = input.reduce((a, [node, nodes]) => {
    if (node === 'broadcaster') {
      a.set('broadcaster', { type: Broadcaster, nodes, label: node })
      return a
    }
    const label = node.substring(1)
    switch (node[0]) {
      case '%':
        a.set(label, {
          type: FlipFlop,
          state: false,
          nodes,
          label,
        })
        break
      case '&':
        a.set(label, {
          type: Conjuction,
          label,
          memory: {},
          nodes,
        })
        break
    }
    return a
  }, new Map())
  const Nil = (label) => ({ type: None, nodes: [], label: label })
  for (const [label, node] of tree) {
    node.nodes.forEach((label) => {
      if (!tree.has(label)) tree.set(label, Nil(label))
    })
  }

  const recursive = (N) => {
    let low = 0
    let high = 0
    const inc = (pulse) => (pulse === 0 ? ++low : ++high)
    const stack = new Brrr()
    const rec = (node, pulse, parent) => {
      switch (node.type) {
        case Broadcaster:
          stack.append(() => {
            node.nodes.forEach((n) =>
              print(`${node.label} -${pulse ? 'high' : 'low'}-> ${n}`)
            )
            node.nodes.forEach((label) => rec(tree.get(label), pulse, node))
          })
          break
        case FlipFlop:
          {
            // ignore high pulse
            stack.append(() => {
              if (pulse === 1) return
              const flip = !node.state
              node.state = flip
              node.nodes.forEach((n) =>
                print(`${node.label} -${flip ? 'high' : 'low'}-> ${n}`)
              )
              node.nodes.forEach((label) => rec(tree.get(label), +flip, node))
            })
          }
          break
        case Conjuction:
          {
            stack.append(() => {
              node.memory[parent.label] = pulse
              const p = Object.values(node.memory).every((pulse) => pulse === 1)
                ? 0
                : 1
              node.nodes.forEach((n) =>
                print(`${node.label} -${p ? 'high' : 'low'}-> ${n}`)
              )
              node.nodes.forEach((label) => rec(tree.get(label), p, node))
            })
          }
          break
        case None:
          break
      }
      inc(pulse)
    }
    const root = tree.get('broadcaster')
    for (let i = 0; i < N; ++i) {
      stack.append(() => rec(root, 0, Nil('root')))
      while (!stack.isEmpty()) stack.chop()()
    }
    console.log({ low, high })
    return low * high
  }
  recursive(1000)
  for (const [label, node] of tree) {
    switch (node.type) {
      case FlipFlop:
        node.state = false
        break
      case Conjuction:
        node.memory = Object.keys(node.memory).reduce(
          (a, b) => ({ ...a, [b]: 0 }),
          {}
        )
        break
    }
  }
  return recursive(1000)
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(sample2))
console.log(part1(input))
