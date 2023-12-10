import { Brrr } from 'array-go-brrr'
import { read } from '../../AT/utils.js'

const parse = (input) =>
  Brrr.from(input.trim().split('\n')).map((x) => Brrr.from([...x]))
const sample0 = parse(
  `.....
.F-7.
.|.|.
.L-J.
.....`
)
const sample1 = parse(
  `.....
.S-7.
.|.|.
.L-J.
.....`
)
const sample2 = parse(
  `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
)
// const input = parse(read())
console.log(sample1.items)
