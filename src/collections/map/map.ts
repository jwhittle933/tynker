import { Enumerable } from '@/collections/enum'

interface MapModule {
  fromObject: <T extends Object>(obj: T) => T
  fromEnum: <T>(enumerable: Enumerable<T>) => Map<T>
}

export interface Map<T extends Object> {
  [index: string]: T
}

export function fromEnum<T>(this: Map<T>): Enumerable<T> {
  return Object.values(this)
}
