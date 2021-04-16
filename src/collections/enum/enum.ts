import { Enumerable } from '@/collections/enum'

export interface Enum {
  all: <T>(en: Enumerable<T>, fn: Enumerator<T>) => boolean
  any: <T>(en: Enumerable<T>, fn: Enumerator<T>) => boolean
  at: <T>(en: Enumerable<T>, index: number, def?: T) => T | null
  count: <T>(en: Enumerable<T>, fn?: Enumerator<T>) => number
  dedup: <T extends string | number>(en: Enumerable<T>) => Enumerable<T>
  dedupWith: <T>(en: Enumerable<T>, deduper: { (item: T): T }) => Enumerable<T>
  drop: <T>(en: Enumerable<T>, d: number) => Enumerable<T>
}

export interface Enumerator<T> {
  (each: T): boolean
}

export const all = <T>(enumerable: Enumerable<T>, fn: Enumerator<T>): boolean => enumerable.every(fn)

export const any = <T>(enumerable: Enumerable<T>, fn: Enumerator<T>): boolean => enumerable.some(fn)

export const at = <T>(enumerable: Enumerable<T>, index: number, def?: T): T | null => {
  if(enumerable.length <= index) return !!def && def! || null
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
  if(!!fn) return enumerable.filter(fn!).length
  return enumerable.length
}

export const dedup = <T extends string | number>(enumerable: Enumerable<T>): Enumerable<T> => {
  return [... new Set(enumerable)]
}

// TODO: actually dedup
export const dedupWith = <T>(enumerable: Enumerable<T>, deduper: { (item: T): T }): Enumerable<T> => {
  return [... new Set(enumerable)]
}

const drop = <T>(enumerable: Enumerable<T>, d: number): Enumerable<T> => {
  if(d < 0) return enumerable.reverse().filter((x, index) => index < Math.abs(d) && x)
  return enumerable.filter((x, index) => index < d && x)
}

const _enumAdd = <T>(e: Enumerable<T>, item: T) => [...e, item]

export default <Enum>{ all, any, at, count, dedup, dedupWith, drop }


