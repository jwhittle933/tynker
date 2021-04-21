import { Enumerable } from '@/collections/enum'
import { List } from '@/collections/list'

export interface Keyword {
  add: <K, V>(kwl: KeywordList<K, V>, key: K, value: V) => KeywordList<K, V>
}

const toEnum = <K, V>(a: Array<[K, V]>): KeywordList<K, V> =>
  Object.defineProperty(a, 'iter', {
    value: iter,
    writable: false,
  })

export interface KeywordList<K, V> extends List<[K, V]>, Enumerable<[K, V]> {}

function iter<K, V>(this: KeywordList<K, V>): Array<[K, V]> {
  return Array.from(this)
}

const add = <K, V>(kw: KeywordList<K, V>, key: K, value: V): KeywordList<K, V> => toEnum([...kw, [key, value]])

export default <Keyword>{}
