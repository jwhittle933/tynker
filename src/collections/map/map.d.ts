declare module 'tynker/collections/map' {
  import { Map } from './map'
  import { List } from '@/collections/list'
  import { ValueOf } from '@/core/generics/valueof'

  export function fromObject<T>(wrapped: T): Map<T>
  export function remove<T>(map: Map<T>, key: string): Map<T>
  export function drop<T>(map: Map<T>, keys: string[]): Map<T>
  export function take<T>(map: Map<T>, keys: string[]): Map<T>
  export function equal<T>(first: Map<T>, second: Map<T>): boolean
  export function get<T, K extends keyof T>(map: Map<T>, key: K): ValueOf<T> | null
  export function get<T, K extends keyof T>(map: Map<T>, key: K, def: ValueOf<T>): ValueOf<T>
  export function put<T extends Object, K extends keyof T, V>(map: Map<T>, key: K, value: V): Map<T>
  export function hasKey<T>(map: Map<T>, key: string): boolean
  export function keys<T>(map: Map<T>): Array<ValueOf<T>>
  export function values<T>(map: Map<T>): Array<any>
  export function merge<T>(first: Map<T>, second: Map<T>): Map<T>
  export function split<T>(map: Map<T>, keys: string[]): [Map<T>, Map<T>]
  export function toList<T extends Object, K extends keyof T, V>(map: Map<T>): List<[K, V]>

  export default { fromObject, remove, drop, equal, get, put, hasKey, keys, values, merge, split, toList }
}
