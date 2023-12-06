// my goal is to solve them on "one line" even if it makes it more unreadable or complicated

export const solveDay1Part1 = (doc) =>
  doc
    .split('\n')
    .map((line) => line.split('').filter(Number))
    .map((lineDigits) => Number(`${lineDigits.at(0)}${lineDigits.at(-1)}`))
    .reduce((a, b) => a + b)

export const solveDay1Part2 = (
  doc,
  wordsToDigits = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 },
) =>
  doc
    .split('\n')
    .map((line) =>
      [...line.matchAll(new RegExp(`(?=(${Object.keys(wordsToDigits).join('|')}))+|\\d`, 'gi'))]
        .flat()
        .filter(Boolean)
        .map((wordOrDigit) => wordsToDigits[wordOrDigit] ?? wordOrDigit),
    )
    .map((lineNumbers) => Number(`${lineNumbers.at(0)}${lineNumbers.at(-1)}`))
    .reduce((a, b) => a + b)
