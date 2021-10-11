import Options, { Option } from '@/core/option'
import Modules from '@/core/module'
import { Nullable } from '@/primitive/null'

// Module Interface
export interface Results {
  wrap: <T>(data: T) => Ok<T>
  wrapErr: <E>(error: E) => Err<E>
  unwrap: <T>(r: Result<T>) => Nullable<T>
  expect: <T>(r: Result<T>, msg: string) => T | never
  isOk: <T>(r: Result<T>) => boolean
  isErr: <T>(r: Result<T>) => boolean
  ok: <T>(r: Result<T>) => Option<T | false>
  err: <E>(r: Result<E>) => Option<E | false>
}

export interface Result<T> {}

export interface Ok<T> extends Result<T> {
  value: T
}

export interface Err<E> extends Result<E> {
  error: E
}

// create functions
const wrap = <T>(value: T): Ok<T> => ({ value } as Ok<T>)

const wrapErr = <E>(error: E): Err<E> => ({ error } as Err<E>)

// operate
const unwrap = <T>(r: Result<T>): Nullable<T> => (r as Ok<T>).value || null

const expect = <T>(r: Result<T>, msg: string): T | never => {
  const val = (r as Ok<T>).value
  if (val) return val

  throw new Error(msg)
}

const isOk = <T>(r: Result<T>): boolean => !!(r as Ok<T>).value
const isErr = <T>(r: Result<T>): boolean => !isOk(r)

const ok = <T>(r: Result<T>): Option<T | false> => (isOk(r) && Options.some((r as Ok<T>).value)) || Options.none()

const err = <E>(r: Result<E>): Option<E | false> => (isErr(r) && Options.some((r as Err<E>).error)) || Options.none()

export default Modules.module<Results>({ wrap, wrapErr, unwrap, expect, isOk, isErr, ok, err })
