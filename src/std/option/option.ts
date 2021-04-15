import { cast } from '@/std/generics'
import Results, { Result } from '@/std/result/result'

// Module Interface
  export interface Options {
  some: <T>(some: T) => Option<T>
  none: () => Option
}

export interface OptionError {
  message: string
}

export interface OptionMapper<T, M> {
  (wrapped: T): M
}

interface OptionBase {
  isSome: () => boolean
  isNone: () => boolean
  contains: <T>(val: T) => boolean
  unwrap: <T>() => T | never
  unwrapOr: <T>(def: T) => T
  map: <T, M>(mapper: OptionMapper<T, M>) => Option<M> | Option
  mapOr: <T, M>(def: M, mapper: OptionMapper<T, M>) => M
}

export interface Option<T = false> extends OptionBase {
  Some?: T
  None?: boolean
}
function isSome<T>(this: Option<T>): boolean {
  return !this.None!
}

function isNone<T>(this: Option<T>): boolean {
  return this.None!
}

function unwrap<T>(this: Option<T>): T | never {
  if (this.isSome()) return this.Some!

  throw cast<OptionError>({ message: 'Option is None' })
}

function unwrapOr<T>(this: Option<T>, def: T): T {
  if (this.isSome()) return this.Some!
  return def
}

function map<T, M>(this: Option<T>, mapper: OptionMapper<T, M>): Option<M> | Option {
  if (this.isSome()) return some<M>(mapper(this.Some!))
  return none()
}

function mapOr<T, M>(this: Option<T>, def: M, mapper: OptionMapper<T, M>): M {
  if(this.isSome()) return mapper(this.Some!)
  return def
}

function contains<T>(this: Option<T>, val: T): boolean {
  return this.isSome() && this.Some! === val
}

const optionBase = { isSome, isNone, unwrap, unwrapOr, map, mapOr, contains }

const some = <T>(some: T): Option<T> => {
  return { Some: some, None: false, ...optionBase }
}

const none = (): Option => {
  return { None: true, ...optionBase }
}

export default cast<Options>({ some, none })
