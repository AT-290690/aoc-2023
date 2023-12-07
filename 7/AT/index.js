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

const part1 = (cards) => {
  const strength = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
  }
  const toStrength = (card) => (card in strength ? strength[card] : +card)
  const toRank = (pairs) => {
    if (pairs.get(4) && pairs.get(4).length === 1) return 6
    if (pairs.get(3) && pairs.get(3).length === 1) return 5
    if (pairs.get(2) && pairs.get(1)) return 4
    if (pairs.get(2) && pairs.get(2).length === 1) return 3
    if (pairs.get(1) && pairs.get(1).length === 2) return 2
    if (pairs.get(1) && pairs.get(1).length === 1) return 1
    else return 0
  }
  let plays = []
  for (const [hand, bid] of cards) {
    const play = new Map()
    const strength = hand.map(toStrength)
    for (const h of strength) {
      if (play.has(h)) {
        const current = play.get(h)
        play.set(h, current + 1)
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
      hand: strength,
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
const part2 = (cards) => {
  const strength = {
    A: 13,
    K: 12,
    Q: 11,
    J: 1,
    T: 10,
  }
  const toStrength = (card) => (card in strength ? strength[card] : +card)
  const toRank = (pairs) => {
    if (pairs.get(4) && pairs.get(4).length === 1) return 6
    if (pairs.get(3) && pairs.get(3).length === 1) return 5
    if (pairs.get(2) && pairs.get(1)) return 4
    if (pairs.get(2) && pairs.get(2).length === 1) return 3
    if (pairs.get(1) && pairs.get(1).length === 2) return 2
    if (pairs.get(1) && pairs.get(1).length === 1) return 1
    else return 0
  }
  const toPairs = (play) => {
    const pairs = new Map()
    for (const [k, v] of play) {
      if (!pairs.has(v)) pairs.set(v, [k])
      else pairs.get(v).push(k)
    }
    return pairs
  }
  const toPlays = (cards, callback) => {
    let plays = []
    for (const [hand, bid] of cards) {
      const play = new Map()
      const strength = hand.map(toStrength)
      for (const h of strength) {
        if (play.has(h)) {
          const current = play.get(h)
          play.set(h, current + 1)
        } else play.set(h, 0)
      }
      const order = callback(play, hand)
      plays.push({
        order,
        hand: strength,
        bid,
      })
    }
    return plays
  }
  const combinations = (hand, N) => {
    const combos = []
    for (let i = 0; i < hand.length; ++i)
      if (hand[i] === 'J')
        for (const c of hand) {
          if (c !== 'J') {
            const combo = [...hand]
            combo[i] = c
            combos.push(combo)
          }
        }
    return N === 0 ? combos : combos.map((x) => combinations(x, N - 1)).flat(1)
  }
  const toPairRanks = (play) => toRank(toPairs(play))
  const toJoker = (play, hand) => {
    if (play.has(1)) {
      if (play.get(1) === 4) return 6
      let max = 0
      const combos = combinations(hand, play.get(1))
      for (const c of combos)
        max = Math.max(max, toPlays([[c, 0]], toPairRanks).at(0).order)
      return max
    } else return toPairRanks(play)
  }
  const ordered = toPlays(cards, toJoker)
    .sort((a, b) => {
      if (a.order !== b.order) return b.order - a.order
      else
        for (let i = 0; i < a.hand.length; ++i)
          if (a.hand[i] !== b.hand[i]) return b.hand[i] - a.hand[i]
    })
    .reverse()
  const bids = ordered.map((x) => x.bid)
  return bids.reduce((a, x, i) => a + x * (i + 1), 0)
}
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
