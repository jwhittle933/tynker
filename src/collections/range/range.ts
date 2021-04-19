import { Enumerable } from '@/collections/enum'

export interface RangeModule {
  from: (lower: number, upper: number) => Range
  fromObject: (bounds: { lower: number; upper: number }) => Range
  fromString: (bounds: string) => Range
  within: (r: Range, n: number) => boolean
}

export interface Range extends Enumerable<number> {
  lower: number
  upper: number
}

// TODO: test lower and upper
// TODO: support reverse ranges/negative ranges
const from = (lower: number = 0, upper: number = Number.MAX_SAFE_INTEGER): Range => {
  return { lower, upper, iter }
}

const fromObject = (bounds: { lower: number; upper: number }): Range => {
  return from(bounds.lower, bounds.upper)
}

const fromString = (bounds: string = '1..100'): Range => {
  return from(...bounds.split('..').map((bound) => Number(bound)))
}

function iter(this: Range): Array<number> {
  const size = this.upper - this.lower
  return Array.from(new Array(size)).map((x, i) => i + this.lower)
}

const within = (r: Range, n: number): boolean => n >= r.lower && n <= r.upper

export default <RangeModule>{ from, fromObject, fromString, within }
