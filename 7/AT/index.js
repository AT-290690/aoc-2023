const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => x.split(' '))
    .map(([hand, bid]) => [[...hand], +bid])
const sample = parse(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
const strength = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
}
const toRank = (pairs) => {
  if (pairs.get(4) && pairs.get(4).length === 1) return 6
  if (pairs.get(3) && pairs.get(3).length === 1) return 5
  if (pairs.get(2) && pairs.get(1)) return 4
  if (pairs.get(2) && pairs.get(2).length === 1) return 3
  if (pairs.get(1) && pairs.get(1).length === 2) return 2
  if (pairs.get(1) && pairs.get(1).length === 1) return 1
  else return 0
}
const toStrength = (card) => (card in strength ? strength[card] : +card)
const part1 = (cards) => {
  let plays = []
  const cardMap = new Map()
  for (const [hand, bid] of cards) {
    const play = new Map()
    const strenght = hand.map(toStrength)
    for (const h of strenght) {
      if (play.has(h)) {
        const current = play.get(h)
        play.set(h, current + 1)
        cardMap.set()
      } else play.set(h, 0)
    }
    const pairs = new Map()
    for (const [k, v] of play) {
      if (!pairs.has(v)) pairs.set(v, [k])
      else pairs.get(v).push(k)
    }
    const order = toRank(pairs)
    plays.push({
      order,
      hand: strenght,
      bid,
    })
  }
  const ordered = plays
    .sort((a, b) => {
      if (a.order !== b.order) return b.order - a.order
      else {
        for (let i = 0; i < a.hand.length; ++i) {
          if (a.hand[i] !== b.hand[i]) return b.hand[i] - a.hand[i]
        }
      }
    })
    .reverse()
  const bids = ordered.map((x) => x.bid)
  return bids.reduce((a, x, i) => a + x * (i + 1), 0)
}

console.log(part1(sample))
console.log(part1(input))
