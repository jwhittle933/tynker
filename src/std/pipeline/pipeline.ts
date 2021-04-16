export interface Pipeline<T> {
  pipe: Piper<T>
}

interface Piper<T> {
  (...fns: PipelineFunc<T>[]): (initial: T) => T
}

export interface PipelineFunc<T> {
  (data: T): T
}

export const pipe = <T>(...fns: PipelineFunc<T>[]) => (initial: T) => fns.reduce((v, f) => f(v), initial)
