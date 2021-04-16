declare module 'tynker/collections/enum' {
  import { Enumerable, Enumerator } from './enumerable'

  declare const all = <T extends Array<T>>(en: Enumerable<T>) => boolean
  declare const count = <T extends Array<T>>(en: Enumerable<T>) => number
  declare const count = <T extends Array<T>>(en: Enumerable<T>, fn: Enumerator) => number
}
