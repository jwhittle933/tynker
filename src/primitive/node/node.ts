interface NodeValue<T> {
  value: () => T
}

interface NodeNext<T> extends NodeValue<T> {
  next: () => Node<T> | null
}

interface NodePrev<T> extends NodeValue<T> {
  prev: () => Node<T> | null
}

export interface Node<T> extends NodePrev<T>, NodeNext<T> {
  link: (next: Node<T>) => Node<T>
}

const create = <T>(val: T, next: Node<T> | null = null, prev: Node<T> | null = null): Node<T> => ({
  value: (): T => val,
  next: (): Node<T> | null => next,
  prev: (): Node<T> | null => prev,
  link: (next: Node<T> | null = null, prev: Node<T> | null = null) => create(val, next, prev),
})

export default { create }
