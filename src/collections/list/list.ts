import { Enumerable } from '@/collections/enum'

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
