import { read } from '../../AT/utils.js'

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((x) => x.split('\n').map((x) => x.split('').map((x) => +(x === '#'))))
const sample = parse(`
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)

const sample2 = parse(`
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

`)

const sample3 = parse(`
..##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#...##..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`)
Array.prototype.adjacentDifference = function (callback = (a, b) => b - a) {
  const len = this.length
  if (len === 1) return this
  const result = [this[0]]
  for (let i = 1; i < len; ++i)
    result[i] = callback(this[i - 1], this[i], i, this)
  return result
}

Array.prototype.rotateRight = function () {
  const result = []
  this.forEach((a, i, aa) => {
    a.forEach((b, j, bb) => {
      result[bb.length - j - 1] = result[bb.length - j - 1] || []
      result[bb.length - j - 1][i] = b
    })
  })
  return result
}

Array.prototype.rotateLeft = function (array) {
  const result = []
  array.forEach((a, i, aa) => {
    a.forEach((b, j, bb) => {
      result[j] = result[j] || []
      result[j][aa.length - i - 1] = b
    })
  })
  return result
}

const part1 = (mirrors) => {
  const rec = (offset, count, arr, out) => {
    const left = offset - count
    const right = offset + count + 1
    if (arr[left] && arr[right]) {
      out.push(+(arr[left] === arr[right]))
      return rec(offset, count + 1, arr, out)
    } else return out
  }

  const traverse = (mirror) => {
    const parsed = mirror.map((x) => parseInt(x.join(''), 2))
    const idxs = []
    for (let i = 0; i < parsed.length; ++i)
      idxs.push([i, rec(i, 0, parsed, [])])
    const [idx, arr] = idxs.find((x) => !x[1].some((x) => x === 0))
    if (arr.length === 0) return []
    return [idx + 1, idx + 2]
  }

  const incidence = []
  for (const mirror of mirrors) {
    const hor = traverse(mirror)
    const ver = traverse(mirror.rotateRight().rotateRight().rotateRight())
    incidence.push(hor.length > ver.length ? hor.at(0) * 100 : ver.at(0))
  }
  return incidence.reduce((a, b) => a + b, 0)
}

const part2 = (mirrors) => {
  const rec = (offset, count, arr, out) => {
    const left = offset - count
    const right = offset + count + 1
    if (arr[left] && arr[right]) {
      out.push(+(arr[left] === arr[right]))
      return rec(offset, count + 1, arr, out)
    } else {
      return out
    }
  }
  const bit = (number, n) => number ^ (1 << n)
  const traverse = (mirror) => {
    const parsed = mirror.map((x) => parseInt(x.join(''), 2))
    const out = []
    for (let j = 0; j < parsed.length; ++j) {
      const idxs = []
      for (let i = 0; i < parsed.length; ++i) {
        const copy = [...parsed]
        copy[i] = bit(parsed[i], j)
        idxs.push([i, rec(i, 0, copy, [])])
      }
      const [idx, arr] = idxs.find((x) => !x[1].some((x) => x === 0))
      out.push(arr.length === 0 ? [] : [idx + 1, idx + 2])
    }
    return out.filter((x) => x.length).flat(1)
  }
  const incidence = []
  for (const mirror of mirrors) {
    const hor = traverse(mirror)
    const ver = traverse(mirror.rotateRight().rotateRight().rotateRight())
    console.log({ hor, ver })
    incidence.push(hor.length > ver.length ? hor.at(0) * 100 : ver.at(0))
  }
  return incidence.reduce((a, b) => a + b, 0)
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
// console.log(part2(sample))
