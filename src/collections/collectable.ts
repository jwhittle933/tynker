export interface CollectorFunc<T> {
  (value: T, next: T): T
}

export interface Collectable<T> {
  into: (original: T) => [T, CollectorFunc<T>]
}
