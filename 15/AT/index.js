import { read } from '../../AT/utils.js'

const parse = (input) => input.trim().split(',')
const sample = parse(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`)
const part1 = (input) => {
  // Holiday ASCII String Helper algorithm

  // Determine the ASCII code for the current character of the string.
  // Increase the current value by the ASCII code you just determined.
  // Set the current value to itself multiplied by 17.
  // Set the current value to the remainder of dividing itself by 256.
  return input.reduce((a, b) => {
    let temp = 0
    for (const c of b) {
      const first = c.charCodeAt(0)
      temp += first
      temp *= 17
      temp %= 256
    }
    return a + temp
  }, 0)
}
const part2 = (input) => {
  // Holiday ASCII String Helper algorithm

  // Determine the ASCII code for the current character of the string.
  // Increase the current value by the ASCII code you just determined.
  // Set the current value to itself multiplied by 17.
  // Set the current value to the remainder of dividing itself by 256.
  const hash = (b) => {
    let temp = 0
    for (const c of b) {
      const first = c.charCodeAt(0)
      temp += first
      temp *= 17
      temp %= 256
    }
    return temp
  }
  // HASHMAP
  // (Holiday ASCII String Helper Manual Arrangement Procedure)
  return input
    .map((x) => {
      if (x.includes('=')) {
        const [label, n] = x.split('=')
        return [label, '=', +n]
      } else {
        const [label, n] = x.split('-')
        return [label, '-', +n]
      }
    })
    .reduce(
      (box, [label, op, n]) => {
        const key = hash(label)
        const current = box[key]
        const index = current.findIndex(([x]) => x === label)
        switch (op) {
          case '-':
            if (index !== -1) {
              current[index] = undefined
              box[key] = box[key].filter(Boolean)
            }
            break
          case '=':
            if (index !== -1) current[index][1] = n
            else current.push([label, n])
            break
        }
        return box
      },
      Array.from({ length: 256 })
        .fill(null)
        .map(() => [])
    )
    .reduce(
      (a, b, i) => a + b.reduce((a, [_, b], j) => a + (i + 1) * b * (j + 1), 0),
      0
    )
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(input))
