import { Enumerable } from '@/collections/enum'
import { KeywordList } from '@/collections/keyword/keyword'

export interface Map<T extends Object> extends Enumerable<[string, T]> {
  wrapped: T
}

const toMap = <T extends Object>(wrapped: T): Map<T> => ({ wrapped, iter })

function iter<T>(this: Map<T>): Array<[string, T]> {
  return Object.entries(this.wrapped)
}

export const fromObject = <T>(wrapped: T): Map<T> => toMap(wrapped)

export const remove = <T>(map: Map<T>, key: string): Map<T> =>
  toMap<T>(
    Object.keys(map.wrapped)
      .filter((k) => k !== key)
      .reduce((acc, k) => ({ ...acc, [k]: map.wrapped[k] }), {}),
  )

export const drop = <T>(map: Map<T>, keys: string[]): Map<T> =>
  toMap<T>(keys.reduce((acc, k) => ({ ...remove(toMap(acc), k) }), map.wrapped))

export const equal = <T>(first: Map<T>, second: Map<T>): boolean =>
  JSON.stringify(first.wrapped) === JSON.stringify(second.wrapped)

export const get = <T, R>(map: Map<T>, key: string, def?: R): R | null => {
  if(def) return <R>map.wrapped[key] || def!
  return <R>map.wrapped[key] || null
}

export const hasKey = <T>(map: Map<T>, key: string): boolean => !!(map.wrapped[key])

export const keys = <T>(map: Map<T>): Array<string> => Object.keys(map.wrapped)

export const merge = <T>(first: Map<T>, second: Map<T>) => toMap({ ...first.wrapped, ...second.wrapped })

export default { fromObject, remove, drop, equal, get, hasKey, keys, merge }
