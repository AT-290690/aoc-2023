import { read } from '../../AT/utils.js'
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
const input = parse(read())
const cardsToStrength = (card, strength) =>
  card in strength ? strength[card] : +card
const pairsToRank = (pairs) =>
  pairs.get(4) && pairs.get(4).length === 1
    ? 6
    : pairs.get(3) && pairs.get(3).length === 1
    ? 5
    : pairs.get(2) && pairs.get(1)
    ? 4
    : pairs.get(2) && pairs.get(2).length === 1
    ? 3
    : pairs.get(1) && pairs.get(1).length === 2
    ? 2
    : pairs.get(1) && pairs.get(1).length === 1
    ? 1
    : 0
const playToPairs = (play) => {
  const pairs = new Map()
  for (const [k, v] of play)
    if (!pairs.has(v)) pairs.set(v, [k])
    else pairs.get(v).push(k)
  return pairs
}
const cardsToPlays = (cards, callback, STRENGTH) => {
  let plays = []
  for (const [hand, bid] of cards) {
    const play = new Map()
    const strengths = hand.map((card) => cardsToStrength(card, STRENGTH))
    for (const strength of strengths)
      if (play.has(strength)) {
        const current = play.get(strength)
        play.set(strength, current + 1)
      } else play.set(strength, 0)
    const order = callback(play, hand)
    plays.push({
      order,
      strengths,
      bid,
    })
  }
  return plays
}
const playsToPairRanks = (play) => pairsToRank(playToPairs(play))
const playsToOrdered = (plays) =>
  plays.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    else
      for (let i = 0; i < a.strengths.length; ++i)
        if (a.strengths[i] !== b.strengths[i])
          return a.strengths[i] - b.strengths[i]
  })
const orderedToBids = (ordered) => ordered.map(({ bid }) => bid)
const bidsToResult = (bids) =>
  bids.reduce((result, bid, index) => result + bid * (index + 1), 0)
const part1 = (cards) => {
  const STRENGTH = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
  }
  return bidsToResult(
    orderedToBids(
      playsToOrdered(cardsToPlays(cards, playsToPairRanks, STRENGTH))
    )
  )
}
const part2 = (cards) => {
  const STRENGTH = {
    A: 13,
    K: 12,
    Q: 11,
    J: 1,
    T: 10,
  }
  const combinations = (hand, N) => {
    const combos = []
    for (let i = 0; i < hand.length; ++i)
      if (hand[i] === 'J')
        for (const card of hand.filter((card) => card !== 'J')) {
          const combo = [...hand]
          combo[i] = card
          combos.push(combo)
        }
    return N === 0
      ? combos
      : combos.map((combo) => combinations(combo, N - 1)).flat(1)
  }
  const toJoker = (play, hand) => {
    if (play.has(1)) {
      const N = play.get(1)
      if (N === 4) return 6
      let max = 0
      const combos = combinations(hand, N)
      for (const combo of combos)
        max = Math.max(
          max,
          cardsToPlays([[combo, 0]], playsToPairRanks, STRENGTH).at(0).order
        )
      return max
    } else return playsToPairRanks(play)
  }
  return bidsToResult(
    orderedToBids(playsToOrdered(cardsToPlays(cards, toJoker, STRENGTH)))
  )
}
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
