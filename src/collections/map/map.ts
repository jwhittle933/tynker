import { Enumerable } from '@/collections/enum'

interface Maps {
  fromObject: <T extends Object>(obj: T) => T
}

export interface Map<T extends Object> extends Enumerable<[string, T]> {
  iter: () => Array<[string, T]>
  wrapped: T
}

function iter<T>(this: Map<T>): Array<[string, T]> {
  const { iter, ...rest } = this
  return Object.entries(rest)
}

export const fromObject = <T>(wrapped: T): Map<T> => {
  return { wrapped, iter }
}

export default <Maps>{ fromObject }
