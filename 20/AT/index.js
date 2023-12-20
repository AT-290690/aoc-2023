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
const Broadcaster = Symbol('*')
const FlipFlop = Symbol('%')
const Conjuction = Symbol('&')
const None = Symbol('-')
const End = Symbol('+')
const Nil = (label) => ({ type: None, nodes: [], label: label })
const Rx = (label) => ({ type: End, nodes: [], label: label })
const build = (input) => {
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
  for (const [label, node] of tree) {
    node.nodes.forEach((label) => {
      if (!tree.has(label)) {
        const node = label === 'rx' ? Rx(label) : Nil(label)
        tree.set(label, node)
      }
    })
  }
  return tree
}
const part1 = (input) => {
  const tree = build(input)
  const recursive = (N) => {
    let low = 0
    let high = 0
    const inc = (pulse) => (pulse === 0 ? ++low : ++high)
    const stack = new Brrr()
    const rec = (node, pulse, parent) => {
      switch (node.type) {
        case Broadcaster:
          stack.append(() =>
            node.nodes.forEach((label) => rec(tree.get(label), pulse, node))
          )
          break
        case FlipFlop:
          {
            // ignore high pulse
            stack.append(() => {
              if (pulse === 1) return
              const flip = !node.state
              node.state = flip
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
              node.nodes.forEach((label) => rec(tree.get(label), p, node))
            })
          }
          break
        case None:
          break
        case End:
          break
      }
      inc(pulse)
    }
    const root = tree.get('broadcaster')
    for (let i = 0; i < N; ++i) {
      stack.append(() => rec(root, 0, Nil('root')))
      while (!stack.isEmpty()) stack.chop()()
    }
    return low * high
  }
  const N = 1000
  recursive(N)
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
  return recursive(N)
}

const part2 = (input) => {
  const tree = build(input)
  let map = {
    sp: 0,
    sv: 0,
    qs: 0,
    pg: 0,
  }
  const recursive = (N) => {
    let low = 0
    let high = 0
    const inc = (pulse) => (pulse === 0 ? ++low : ++high)
    const stack = new Brrr()
    const rec = (node, pulse, parent) => {
      switch (node.type) {
        case Broadcaster:
          stack.append((i) =>
            node.nodes.forEach((label) => rec(tree.get(label), pulse, node))
          )
          break
        case FlipFlop:
          {
            // ignore high pulse
            stack.append((i) => {
              if (pulse === 1) return
              const flip = !node.state
              node.state = flip
              node.nodes.forEach((label) => rec(tree.get(label), +flip, node))
            })
          }
          break
        case Conjuction:
          {
            stack.append((i) => {
              node.memory[parent.label] = pulse
              if (node.label === 'gf' && pulse === 1) {
                if (!map['sp'] && parent.label === 'sp' && node.memory['sp']) {
                  map['sp'] = i
                }
                if (!map['sv'] && parent.label === 'sv' && node.memory['sv']) {
                  map['sv'] = i
                }
                if (!map['qs'] && parent.label === 'qs' && node.memory['qs']) {
                  map['qs'] = i
                  map['qs']
                }
                if (!map['pg'] && parent.label === 'pg' && node.memory['pg']) {
                  map['pg'] = i
                  map['pg']
                }
              }
              const p = Object.values(node.memory).every((pulse) => pulse === 1)
                ? 0
                : 1
              node.nodes.forEach((label) => rec(tree.get(label), p, node))
            })
          }
          break
        case None:
          break
        case End:
          break
      }
      inc(pulse)
    }
    const root = tree.get('broadcaster')
    for (let i = 0; i < N; ++i) {
      stack.append((i) => rec(root, 0, Nil('root')))
      while (!stack.isEmpty()) stack.chop()(i + 1)
    }
    return low * high
  }
  const N = 4051
  recursive(N)
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
  map = {
    sp: 0,
    sv: 0,
    qs: 0,
    pg: 0,
  }
  recursive(N)
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
  const lcd = (a, b) => (a / gcd(a, b)) * b
  return Object.values(map)
    .map((i) => i)
    .reduce(lcd, 1)
}

const input = parse(read())
console.log(part1(sample))
console.log(part1(sample2))
console.log(part1(input))
console.log(part2(input))
