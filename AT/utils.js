import { readFileSync, writeFileSync } from 'fs'
export const read = (file = 'input') =>
  readFileSync(`${process.argv[1]}/${file}.txt`, 'utf-8')
export const write = (data, file = 'output') =>
  writeFileSync(`${process.argv[1]}/${file}.txt`, data)
