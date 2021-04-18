export enum CollectionInstruction {
  DONE = 'done',
  CONT = 'continue',
}

export interface CollectorFunc<T> {
  (value: T, next: [CollectionInstruction, any]): T
}

export interface Collectable<T> {
  into: <T>() => [T, CollectorFunc<T>]
}
