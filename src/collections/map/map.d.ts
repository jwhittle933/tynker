declare module 'tynker/collections/map' {
  import { Map } from './map'

  export function fromObject<T>(wrapped: T): Map<T>
  export function remove<T>(map: Map<T>, key: string): Map<T>
  export function drop<T>(map: Map<T>, keys: string[]): Map<T>
  export function equal<T>(first: Map<T>, second: Map<T>): boolean
  export function get<T, R>(map: Map<T>, key: string): R | null
  export function get<T, R>(map: Map<T>, key: string, def: R): R
  export function hasKey<T>(map: Map<T>, key: string): boolean
  export function keys<T>(map: Map<T>): Array<string>
  export function merge<T>(first: Map<T>, second: Map<T>): Map<T>

  export default { fromObject, remove, drop, equal, get, hasKey, keys }
}
