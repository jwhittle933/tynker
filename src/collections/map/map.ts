import { Enumerable } from '@/collections/enum'
import { List } from '@/collections/list'
import { ValueOf } from '@/core/generics/valueof'

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

export const take = <T>(map: Map<T>, keys: string[]): Map<T> =>
  toMap<T>(keys.reduce((acc, k) => ({ ...acc, [k]: map.wrapped[k] }), {}))

export const equal = <T>(first: Map<T>, second: Map<T>): boolean =>
  JSON.stringify(first.wrapped) === JSON.stringify(second.wrapped)

export const get = <T, K extends keyof T>(map: Map<T>, key: K, def?: ValueOf<T>): ValueOf<T> | null => {
  if (def) return map.wrapped[key] || def!
  return map.wrapped[key] || null
}

export const put = <T extends Object, K extends keyof T, V>(map: Map<T>, key: K, value: V): Map<T> =>
  toMap({ ...map.wrapped, [key]: value })

export const hasKey = <T>(map: Map<T>, key: string): boolean => !!map.wrapped[key]

export const keys = <T>(map: Map<T>): List<string> => Object.keys(map.wrapped)

export const values = <T>(map: Map<T>): List<ValueOf<T>> => Object.values(map.wrapped)

export const merge = <T>(first: Map<T>, second: Map<T>) => toMap({ ...first.wrapped, ...second.wrapped })

export const split = <T>(map: Map<T>, keys: string[]): [Map<T>, Map<T>] => [drop(map, keys), take(map, keys)]

export const toList = <T, K extends keyof T, V>(map: Map<T>): List<[K, V]> => <List<[K, V]>>Object.entries(map.wrapped)

export default { fromObject, remove, drop, take, equal, get, put, hasKey, keys, values, merge, split, toList }
