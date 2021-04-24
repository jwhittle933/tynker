import { Enumerable } from '@/collections/enum'
import Modules from '@/core/module'
import Numbers from '@/primitive/number'

/**
 * `Lists` Module
 *
 * Examples:
 * ```typescript
 * const list = Lists.new<number>([1, 2, 3, 4])
 * Lists.shuffle(list) // => [3, 1, 2, 4]
 *
 * // List satisfies Enumerable
 * list.iter() // => Array<number>
 * ```
 * */
export interface Lists {
  new: <T>(arr: T[]) => List<T>
  shuffle: (list: List<StringOrNumber>) => List<StringOrNumber>
  shuffleMut: (list: List<StringOrNumber>) => List<StringOrNumber>
  swap: (list: List<StringOrNumber>, i: number, j: number) => List<StringOrNumber>
}

type StringOrNumber = string | number

export interface List<T> extends Array<T>, Enumerable<T> {
  iter: () => Array<T>
}

const toEnum = <T>(a: Array<T>): List<T> => {
  return Object.defineProperty(a, 'iter', {
    value: iter,
    writable: false,
  })
}

function iter<T>(this: List<T>): Array<T> {
  return this
}

export const shuffle = (list: List<StringOrNumber>): List<StringOrNumber> =>
  toEnum([...list].reduceRight(shuffler, []))

const shuffler = (acc: StringOrNumber[], _item: StringOrNumber, index: number, original: StringOrNumber[]) => {
  return ([...acc, original.splice(0 | Math.random() * length, 1)[0]])
}

export const shuffleMut = (list: List<StringOrNumber>): List<StringOrNumber> => {
  let len = list.length
  let n

  while (len > 0) {
    n = Numbers.rand(len)
    swap(list, n, --len)
  }

  return list
}

export const swap = (list: List<StringOrNumber>, i: number, j: number): List<StringOrNumber> => {
  let q = list[i]
  list[i], list[j] = list[j], q

  return list
}
export default Modules.module<Lists>({
  new: <T>(arr: T[]): List<T> => toEnum<T>(arr),
  shuffle,
  shuffleMut,
  swap,
})
