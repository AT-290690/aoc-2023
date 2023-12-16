import { readFileSync } from 'fs'
export const read = (file = 'input') =>
  readFileSync(`${process.argv[1]}/${file}.txt`, 'utf-8')
