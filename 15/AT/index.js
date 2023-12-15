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
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
