import { Enumerable } from '@/collections/enum'

interface Enum {
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
  isMember: <T>(enumerable: Enumerable<T>, item: T) => boolean
  reject: <T>(enumerable: Enumerable<T>) => Enumerable<T>
  sum: (enumerable: Enumerable<number>) => number
  take: <T>(enumerable: Enumerable<T>) => Enumerable<T>
  uniq: <T>(enumerable: Enumerable<T>) => Enumerable<T>
  zip: <T>(...enumerables: Enumerable<T>[]) => Enumerable<T>
}

export interface Enumerator<T> {
  (each: T): boolean
}

const fromEnum = <T>(enumerable: Enumerable<T>): Array<T> => enumerable.iter()

const toEnum = <T>(a: Array<T>): Enumerable<T> => ({ iter: () => a })

export const all = <T>({ iter }: Enumerable<T>, fn: Enumerator<T>): boolean => iter().every(fn)

export const any = <T>({ iter }: Enumerable<T>, fn: Enumerator<T>): boolean => iter().some(fn)

export const at = <T>({ iter }: Enumerable<T>, index: number, def?: T): T | null => {
  const e = iter()

  if (e.length <= index) return (!!def && def!) || null
  return e[index]
}

// TODO
export const chunkBy = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

// TODO: handle inner arrays
export const concat = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

export const count = <T>({ iter }: Enumerable<T>, fn?: Enumerator<T>): number => {
  if (!!fn) return iter().filter(fn!).length
  return iter().length
}

// TODO: actually dedup
export const dedup = <T>(enumerable: Enumerable<T>): Enumerable<T> => {
  return enumerable
}

// TODO: actually dedup
export const dedupWith = <T>(enumerable: Enumerable<T>, deduper: { (item: T): T }): Enumerable<T> => {
  return enumerable
}

const drop = <T>({ iter }: Enumerable<T>, d: number): Enumerable<T> => {
  // optimization - consider for - loop for iter control
  if (d < 0)
    return toEnum(
      iter()
        .reverse()
        .filter((x, index) => index < Math.abs(d) && x),
    )
  return toEnum(iter().filter((x, index) => index < d && x))
}

const empty = <T>(enumerable: Enumerable<T>): boolean => count(enumerable) === 0

// TODO: handle out of bounds
const fetch = <T>({ iter }: Enumerable<T>, index: number): T => {
  if (index < 0) return iter()[index + iter.length]
  return iter()[index]
}

const into = <T>(container: Enumerable<T>, enumerable: Enumerable<T>): Enumerable<T> => {
  return toEnum([...container.iter(), ...enumerable.iter()])
}

const mapInto = <T>(container: Enumerable<T>, { iter }: Enumerable<T>, apply: { (item: T): T }): Enumerable<T> =>
  into(container, toEnum(iter().map(apply)))

const isMember = <T>({ iter }: Enumerable<T>, item: T) => iter().includes(item)

const reject = <T>({ iter }: Enumerable<T>, fn: { (item: T): boolean }): Enumerable<T> =>
  toEnum(iter().filter((item: T) => !fn(item)))

const sum = ({ iter }: Enumerable<number>): number =>
  iter().reduce((acc, item) => acc + item, 0)

const take = <T>({ iter }: Enumerable<T>, amount: number): Enumerable<T> => {
  if (!amount) return toEnum([])
  if (amount < 0) return toEnum(iter().reverse().slice(0 , Math.abs(amount)))

  return toEnum(iter().slice(0 , amount))
}

// TODO: make more efficient
const uniq = <T>({ iter }: Enumerable<T>): Enumerable<T> =>
  toEnum(
    iter()
      .map(item => JSON.stringify(item))
      .filter((item, index, self) => self.includes(item))
      .map(item => JSON.parse(item))
  )

const zip = <T>(...enumerables: Enumerable<T>[]) => {
   //
}

export default <Enum>{
  all,
  any,
  at,
  count,
  dedup,
  dedupWith,
  drop,
  empty,
  fetch,
  into,
  mapInto,
  isMember,
  reject,
  sum,
  take,
  uniq
}
