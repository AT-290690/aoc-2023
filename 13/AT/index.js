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
const sample4 = parse(`
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`)
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

Array.prototype.rotateLeft = function () {
  const result = []
  this.forEach((a, i, aa) => {
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

  const traverse = (parsed) => {
    const idxs = []
    for (let i = 0; i < parsed.length; ++i)
      idxs.push([i, rec(i, 0, parsed, [])])
    const [idx, arr] = idxs.find((x) => !x[1].some((x) => x === 0))
    if (arr.length === 0) return []
    return [idx + 1, idx + 2]
  }

  const incidence = []
  for (const mirror of mirrors) {
    const H = mirror.map((x) => parseInt(x.join(''), 2))
    const V = mirror.rotateLeft().map((x) => parseInt(x.join(''), 2))
    const hor = traverse(H)
    const ver = traverse(V)
    incidence.push(hor.length ? hor.at(0) * 100 : ver.at(0))
  }
  return incidence.reduce((a, b) => a + b, 0)
}

// const part2 = (mirrors) => {
//   const bit = (number, n) => number ^ (1 << n)
//   // const traverse = (mirror) => {
//   //   const parsed = mirror.map((x) => parseInt(x.join(''), 2))
//   //   const out = []
//   //   const len = mirror[0].length
//   //   for (let j = 0; j < len; ++j) {
//   //     const idxs = []
//   //     for (let i = 0; i < parsed.length; ++i) {
//   //       let copy = [...parsed]
//   //       copy[i] = bit(copy[i], j)
//   //       idxs.push([i, rec(i, 0, copy, [])])
//   //     }
//   //     const [idx, arr] = idxs.find((x) => !x[1].some((x) => x === 0))
//   //     out.push(arr.length === 0 ? [] : [arr[0] + 1, arr[0] + 2])
//   //   }
//   //   return out.filter((x) => x.length).flat(1)
//   // }
//   const traverse2 = (mirror) => {
//     const parsed = mirror.map((x) => parseInt(x.join(''), 2))
//     const idxs = []
//     const len = mirror[0].length
//     for (let d = 0; d < len; ++d) {
//       for (let i = 0; i < parsed.length; ++i) {
//         let copy = [...parsed]
//         copy[i] = bit(copy[i], d)
//         const temp = rec(i, 0, copy, [])
//         idxs.push([i, temp])
//       }
//     }
//     const itsm = idxs.filter((x) => x[1].every((x) => x === 1))
//     const [idx, arr] = itsm.pop()
//     return [idx + 1, idx + 2]
//   }
//   const rec = (offset, count, arr, out) => {
//     const left = offset - count
//     const right = offset + count + 1
//     const parsed = arr.map((x) => parseInt(x.join(''), 2))
//     if (parsed[left] && parsed[right]) {
//       out.push(+(parsed[left] === parsed[right]))
//       return rec(offset, count + 1, arr, out)
//     } else {
//       return out
//     }
//   }
//   const traverse = (mirror) => {
//     const idxs = []
//     const copy = [...mirror]
//     for (let i = 0; i < mirror.length; ++i) {
//       copy[i] = [...mirror[i]]
//       for (let j = 0; j < mirror[0].length; ++j) {
//         copy[i][j] = 1 - copy[i][j]
//         idxs.push([i, rec(i, 0, copy, [])])
//         const [idx, arr] = idxs?.find((x) => !x[1].some((x) => x === 0)) ?? [
//           0,
//           [],
//         ]
//         if (arr.length === 0) return []
//         return [idx + 1, idx + 2]
//       }
//     }
//   }

//   const incidence = []
//   for (const mirror of mirrors) {
//     const hor = traverse(mirror)
//     const ver = traverse(mirror.rotateRight().rotateRight().rotateRight())
//     console.log({ hor, ver })
//     // console.log({ hor, ver })
//     incidence.push(hor.length ? hor.at(0) * 100 : ver.at(0))
//   }
//   return incidence.reduce((a, b) => a + b, 0)
// }
// const input = parse(read())
// console.log(part1(sample))
// console.log(part1(input))

const part2 = (mirrors) => {
  const rec = (offset, arr, out = [], count = 0) => {
    const left = offset - count
    const right = offset + count + 1
    if (arr[left] && arr[right]) {
      out.push(+(arr[left].join('') === arr[right].join('')))
      return rec(offset, arr, out, count + 1)
    } else return out
  }

  const traverse = (parsed) => {
    const idxs = []
    for (let i = 0; i < parsed.length; ++i) idxs.push([i, rec(i, parsed)])
    const [idx, arr] = idxs.find((x) => !x[1].some((x) => x === 0))
    if (arr.length === 0) return []
    return [idx + 1, idx + 2]
  }
  // const bit = (number, n) => number ^ (1 << n)
  const incidence = []
  for (const mirror of mirrors) {
    // const len = mirror[0].length
    for (let i = 0; i < mirror.length; ++i) {
      for (let j = 0; j < mirror[0].length; ++j) {
        const copy = [...mirror].map((x) => [...x])
        copy[i][j] = 1 - copy[i][j]
        const hor = traverse(copy)
        const ver = traverse(copy.rotateLeft())
        if (hor.length || ver.length) {
          const res = hor.length ? hor.at(0) * 100 : ver.at(0)
          incidence.push(res)
          break
        }
      }
    }
  }
  console.log({ incidence })
  return incidence.reduce((a, b) => a + b, 0)
}
// const input = parse(read())
console.log(part2(sample))
