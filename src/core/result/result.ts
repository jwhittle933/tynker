import Options, { Option } from '@/core/option'
import { cast } from '@/core/generics'

// Module Interface
export interface Results {
  newOk: <T>(data: T) => Result<T, unknown>
  newError: <E>(error: E) => Result<unknown, E>
}

// `Result` wraps two potential values, Ok, and Err
export interface Result<T, E> {
  ok: () => Option<T>
  isOk: () => boolean
  asOk: () => Ok<T>
  err: () => Option<E>
  isErr: () => boolean
  asErr: () => Err<E>
  contains: (val: T) => boolean
  containsErr: (err: E) => boolean
  unwrap: () => T | undefined
  unwrapOr: (def: T) => T
  unwrapErr: () => E | undefined
  expect: (msg: string) => T | never
  map: (mapper: { (data: T): Result<T, E> }) => Result<T, E>
}

// Ok extends Result (and can be used in its place)
// The Ok interface wraps the result of a successful
// operation
interface Ok<T> extends Result<T, unknown> {
  data: T
}

// Err extends Result (and can be used in its place)
// The Err interface wraps the result of a failed
// operation
interface Err<E> extends Result<unknown, E> {
  error: E
}

function ok<T, E>(this: Result<T, E>): Option<T | false> {
  if (this.isOk()) return Options.some<T>(this.unwrap()!)
  return Options.none()
}

function isOk<T, E>(this: Result<T, E>): boolean {
  return !!(<Ok<T>>this)
}

function asOk<T>(this: Result<T, unknown>): Ok<T> {
  return <Ok<T>>this
}

function err<T, E>(this: Result<T, E>): Option<E | false> {
  if (this.isErr()) return Options.some<E>(this.unwrapErr()!)
  return Options.none()
}

function isErr<T, E>(this: Result<T, E>): boolean {
  return !!(<Err<E>>this)
}

function asErr<E>(this: Result<unknown, E>): Err<E> {
  return <Err<E>>this
}

function contains<T, E>(this: Result<T, E>, val: T): boolean {
  return this.isOk() && this.asOk().data === val
}

function containsErr<T, E>(this: Result<T, E>, err: E): boolean {
  return this.isErr() && this.asErr().error === err
}

function unwrap<T, E>(this: Result<T, E>): T | undefined {
  if (this.isOk()) return this.asOk().data
  return undefined
}

function unwrapOr<T, E>(this: Result<T, E>, def: T): T {
  if (this.isOk()) return this.asOk().data
  return def
}

function unwrapErr<T, E>(this: Result<T, E>): E | undefined {
  if (this.isErr()) return this.asErr().error
  return undefined
}

// expect asserts that the data exists and returns that data,
// or it will throw an error
// Should be used only when you know for certain that the operation
// succeeded, or within a try/catch
function expect<T>(this: Result<T, unknown>, msg: string): T | never {
  if (this.isOk()) return this.unwrap()!

  throw new Error(msg)
}

// next in functional programming is often called `bind`
// The wrapped data will be unwrapped and passed to the `nextFunc`,
// unless the Result is an error and the Result will be returned
// The `nextFunc` must return a new Result, either newOk or newError
function map<T, E>(this: Result<T, E>, mapper: { (data: T): Result<T, E> }): Result<T, E> {
  if (this.isErr()) return this

  return mapper(this.unwrap()!)
}

const resultBase = {
  ok,
  isOk,
  asOk,
  err,
  isErr,
  asErr,
  contains,
  containsErr,
  unwrap,
  unwrapOr,
  unwrapErr,
  expect,
  map,
}

const newError = <E>(error: E): Result<unknown, E> => {
  return <Err<E>>{ error, ...resultBase }
}

const newOk = <T>(data: T): Result<T, unknown> => {
  return <Ok<T>>{ data, ...resultBase }
}

export default cast<Results>({ newOk, newError })
