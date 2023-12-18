import { read } from '../../AT/utils.js'
class PQ {
  static top = 0
  static parent = (i) => ((i + 1) >>> 1) - 1
  static left = (i) => (i << 1) + 1
  static right = (i) => (i + 1) << 1
  constructor(comparator = (a, b) => a > b) {
    this._heap = []
    this._comparator = comparator
  }
  size() {
    return this._heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this._heap[PQ.top]
  }
  push(...values) {
    for (const value of values) {
      this._heap.push(value)
      this._siftUp()
    }
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > PQ.top) {
      this._swap(PQ.top, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }
  replace(value) {
    const replacedValue = this.peek()
    this._heap[top] = value
    this._siftDown()
    return replacedValue
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j])
  }
  _swap(i, j) {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }
  _siftUp() {
    let node = this.size() - 1
    while (node > PQ.top && this._greater(node, PQ.parent(node))) {
      this._swap(node, PQ.parent(node))
      node = PQ.parent(node)
    }
  }
  _siftDown() {
    let node = PQ.top
    while (
      (PQ.left(node) < this.size() && this._greater(PQ.left(node), node)) ||
      (PQ.right(node) < this.size() && this._greater(PQ.right(node), node))
    ) {
      let maxChild =
        PQ.right(node) < this.size() &&
        this._greater(PQ.right(node), PQ.left(node))
          ? PQ.right(node)
          : PQ.left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}
const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => [...x].map(Number))
const sample = parse(`
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`)
const sample2 = parse(`
111111111111
999999999991
999999999991
999999999991
999999999991`)
const sample3 = parse(`
111111119999
999999919999
999999919999
999999919999
999999911111`)

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]
const delim = '|'
const toPathKey = ([, y, x, dy, dx, n]) =>
  `${y}${delim}${x}${delim}${dy}${delim}${dx}${delim}${n}`
const toDirKey = (dy, dx) => `${dy}${delim}${dx}`
const identity = () => [0, 0, 0, 0, 0, 0]
const zeroKey = toDirKey(0, 0)
const part1 = (input) => {
  const isInBounds = (y, x, matrix) =>
    y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length
  const isAtEnd = (y, x, matrix) =>
    y === matrix.length - 1 && x === matrix[0].length - 1
  const pq = new PQ((a, b) => a.at(0) < b.at(0))
  const visited = new Set()
  const matrix = input
  pq.push(identity())
  while (!pq.isEmpty()) {
    const current = pq.pop()
    const [w, y, x, dy, dx, n] = current
    if (isAtEnd(y, x, matrix)) return w
    const key = toPathKey(current)
    if (visited.has(key)) continue
    visited.add(key)
    const dirKey = toDirKey(dy, dx)
    const inverted = toDirKey(-dy, -dx)
    for (const [dy1, dx1] of dirs) {
      const key = toDirKey(dy1, dx1)
      if (key !== dirKey && key !== inverted) {
        const Y = y + dy1
        const X = x + dx1
        if (isInBounds(Y, X, matrix))
          pq.push([w + matrix[Y][X], Y, X, dy1, dx1, 1])
      }
    }
    if (n < 3 && dirKey !== zeroKey) {
      const Y = y + dy
      const X = x + dx
      if (isInBounds(Y, X, matrix)) {
        pq.push([w + matrix[Y][X], Y, X, dy, dx, n + 1])
      }
    }
  }
}
const part2 = (input) => {
  const isInBounds = (y, x, matrix) =>
    y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length
  const isAtEnd = (y, x, matrix, n) =>
    n >= 4 && y === matrix.length - 1 && x === matrix[0].length - 1
  const pq = new PQ((a, b) => a.at(0) < b.at(0))
  const visited = new Set()
  const matrix = input
  pq.push(identity())
  while (!pq.isEmpty()) {
    const current = pq.pop()
    const [w, y, x, dy, dx, n] = current
    if (isAtEnd(y, x, matrix, n)) return w
    const key = toPathKey(current)
    if (visited.has(key)) continue
    visited.add(key)
    const dirKey = toDirKey(dy, dx)
    const inverted = toDirKey(-dy, -dx)
    if (n >= 4 || dirKey === zeroKey) {
      for (const [dy1, dx1] of dirs) {
        const key = toDirKey(dy1, dx1)
        if (key !== dirKey && key !== inverted) {
          const Y = y + dy1
          const X = x + dx1
          if (isInBounds(Y, X, matrix))
            pq.push([w + matrix[Y][X], Y, X, dy1, dx1, 1])
        }
      }
    }
    if (n < 10 && dirKey !== zeroKey) {
      const Y = y + dy
      const X = x + dx
      if (isInBounds(Y, X, matrix))
        pq.push([w + matrix[Y][X], Y, X, dy, dx, n + 1])
    }
  }
}
const input = parse(read())
console.log(part1(sample))
console.log(part1(input))
console.log(part2(sample))
console.log(part2(sample2))
console.log(part2(input))
