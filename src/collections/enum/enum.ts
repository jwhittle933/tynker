import { Enumerable } from '@/collections/enum'

interface EnumModule {
  all: <T>(en: Enumerable<T>, fn: Enumerator<T>) => boolean
  any: <T>(en: Enumerable<T>, fn: Enumerator<T>) => boolean
  at: <T>(en: Enumerable<T>, index: number, def?: T) => T | null
  count: <T>(en: Enumerable<T>, fn?: Enumerator<T>) => number
  dedup: <T extends string | number>(en: Enumerable<T>) => Enumerable<T>
  dedupWith: <T>(en: Enumerable<T>, deduper: { (item: T): T }) => Enumerable<T>
  drop: <T>(en: Enumerable<T>, d: number) => Enumerable<T>
  empty: <T>(en: Enumerable<T>) => boolean
  fetch: <T>(enumerable: Enumerable<T>, index: number) => T
  into: <T>(container: Enumerable<T>, enumerable: Enumerable<T>) => Enumerable<T>
  mapInto: <T>(container: Enumerable<T>, enumerable: Enumerable<T>, apply: { (item: T): T }) => Enumerable<T>
}

export interface Enumerator<T> {
  (each: T): boolean
}

export const all = <T>(enumerable: Enumerable<T>, fn: Enumerator<T>): boolean => enumerable.every(fn)

export const any = <T>(enumerable: Enumerable<T>, fn: Enumerator<T>): boolean => enumerable.some(fn)

export const at = <T>(enumerable: Enumerable<T>, index: number, def?: T): T | null => {
  if (enumerable.length <= index) return (!!def && def!) || null
  return enumerable[index]
}

// TODO
export const chunkBy = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

// TODO: handle inner arrays
export const concat = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

export const count = <T>(enumerable: Enumerable<T>, fn?: Enumerator<T>): number => {
  if (!!fn) return enumerable.filter(fn!).length
  return enumerable.length
}

// TODO: actually dedup
export const dedup = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

// TODO: actually dedup
export const dedupWith = <T>(enumerable: Enumerable<T>, deduper: { (item: T): T }): Enumerable<T> => {
  return enumerable
}

const drop = <T>(enumerable: Enumerable<T>, d: number): Enumerable<T> => {
  // optimization - consider for - loop for iter control
  if (d < 0) return enumerable.reverse().filter((x, index) => index < Math.abs(d) && x)
  return enumerable.filter((x, index) => index < d && x)
}

const empty = <T>({ length }: Enumerable<T>): boolean => length === 0

// TODO: handle out of bounds
const fetch = <T>(enumerable: Enumerable<T>, index: number): T => {
  if (index < 0) return enumerable[index + enumerable.length]
  return enumerable[index]
}

const into = <T>(container: Enumerable<T>, enumerable: Enumerable<T>): Enumerable<T> => {
  return [...container, ...enumerable]
}

const mapInto = <T>(container: Enumerable<T>, enumerable: Enumerable<T>, apply: { (item: T): T }): Enumerable<T> =>
  into(container, enumerable.map(apply))

export default <EnumModule>{ all, any, at, count, dedup, dedupWith, drop, empty, fetch, into, mapInto }
