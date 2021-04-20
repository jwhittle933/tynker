declare module 'tynker/collections/enum' {
  import { Enumerable, Enumerator } from './enumerable'

  export declare function all<T>(enumerable: Enumerable<T>, fn: Enumerator<T, boolean>): boolean
  export declare function any<T>(enumerable: Enumerable<T>, fn: Enumerator<T, boolean>): boolean
  export declare function at<T>(enumerable: Enumerable<T>, index: number): T | null
  export declare function at<T>(enumerable: Enumerable<T>, index: number, def: T): T
  export declare function count<T>(enumerable: Enumerable<T>): number
  export declare function count<T>(enumerable: Enumerable<T>): number
  export declare function dedup<T>(enumerable: Enumerable<T>): number
  export declare function dedupWith<T>(enumerable: Enumerable<T>, deduper: Enumerator<T, T>): number
  export declare function drop<T>(enumerable: Enumerable<T>, d: number): Enumerable<T>
  export declare function empty<T>(enumerable: Enumerable<T>): boolean
  export declare function fetch<T>(enumerable: Enumerable<T>, index: number): T
  export declare function into<T>(container: Enumerable<T>, enumerable: Enumerable<T>): Enumerable<T>
  export declare function mapInto<T>(
    container: Enumerable<T>,
    enumerable: Enumerable<T>,
    apply: Enumerator<T, T>,
  ): Enumerable<T>
  export declare function isMember<T>(enumerable: Enumerable<T>, item: T): boolean
  export declare function reject<T>(enumerable: Enumerable<T>, fn: Enumerator<T, boolean>): Enumerable<T>
  export declare function sum(enumerable: Enumerable<number>): number
  export declare function take<T>(enumerable: Enumerable<T>, amount: number): Enumerable<T>
  export declare function uniq<T>(enumerable: Enumerable<T>): Enumerable<T>
  export declare function zip<A, B>(first: Enumerable<A>, second: Enumerable<B>): Enumerable<[A, B]>

  export default {
    all,
    any,
    at,
    count,
    dedup,
    dedupWith,
    drop,
    empty,
    into,
    mapInto,
    isMember,
    reject,
    sum,
    take,
    uniq,
    zip,
  }
}
