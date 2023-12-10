import { readFileSync } from 'fs'
export const read = () => readFileSync(`${process.argv[1]}/input.txt`, 'utf-8')
