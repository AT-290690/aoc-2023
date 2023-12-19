import { read } from '../../AT/utils.js'

const parse = (input) => {
  const [a, b] = input.trim().split('\n\n')
  const A = a
    .split('\n')
    .map((x) => {
      const [a, b] = x.split('{')
      const B = b.replace('}', '').split(',')
      B[B.length - 1] = `*:${B.at(-1)}`
      return [
        a,
        B.map((x) => {
          const [predicate, concequent] = x.split(':')
          let p
          if (predicate.includes('>')) {
            const [left, right] = predicate.split('>')
            p = ['>', left, +right]
          } else if (predicate.includes('<')) {
            const [left, right] = predicate.split('<')
            p = ['<', left, +right]
          } else if (predicate.includes('*')) {
            p = concequent === 'A' || concequent === 'R' ? [concequent] : ['*']
          }
          return [p, concequent]
        }),
      ]
    })
    .reduce((a, [src, args]) => ({ ...a, [src]: args }), {})
  const B = b.split('\n').map((x) =>
    x
      .replace('{', '')
      .replace('}', '')
      .split(',')
      .reduce((a, x) => {
        const [word, value] = x.split('=')
        return { ...a, [word]: +value }
      }, {})
  )
  return [A, B]
}
const sample = parse(`
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`)

const part1 = ([workflows, ratings]) => {
  workflows['A'] = [['<', 'a', Infinity], 'A']
  workflows['R'] = [['>', 'a', Infinity], 'R']
  const accepted = []
  const match = (rate, acc) => {
    while (acc && acc.length) {
      const pred = acc.shift()
      const [predicate, next] = pred
      const [cond, left, right] = predicate
      switch (cond) {
        case '>':
          if (rate[left] > right) {
            return match(rate, [...workflows[next]])
          } else continue
          break
        case '<':
          if (rate[left] < right) {
            return match(rate, [...workflows[next]])
          } else continue
          break
        case 'A':
          return true
          break
        case 'R':
          return false
          break
        default:
          return match(rate, [...workflows[next]])
          break
      }
    }
    return false
  }
  for (const rate of ratings) {
    const acc = workflows['in']
    const isAccepted = match(rate, [...acc])
    if (isAccepted) accepted.push(rate)
  }
  return accepted
    .map((x) => Object.values(x))
    .flat(1)
    .reduce((a, b) => a + b, 0)
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
