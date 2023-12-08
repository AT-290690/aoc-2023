const { writeFileSync, mkdirSync } = require('fs')
const [, , day] = process.argv
if (!day && !Number.isInteger(day)) throw new Error('Provide a day number!')
mkdirSync(`${day}`)
mkdirSync(`${day}/AT/`)
writeFileSync(`${day}/AT/input.txt`, '')
writeFileSync(
  `${day}/AT/index.js`,
  `const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
const parse = (input) => input.trim()
const sample = parse()
const input = parse(readFileSync(\`\${dir.join('/')}/AT/input.txt\`, 'utf-8'))
`
)
