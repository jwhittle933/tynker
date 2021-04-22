import { Nullable } from '@/primitive/null'

interface ValueNode<T> {
  value: () => T
}

interface BackwardNode<T> extends ValueNode<T> {
  left: () => Nullable<Node<T>>
}

interface ForwardNode<T> extends ValueNode<T> {
  right: () => Nullable<Node<T>>
}

export interface Node<T> extends BackwardNode<T>, ForwardNode<T> {
  link: (right: Nullable<Node<T>>, left: Nullable<Node<T>> = null) => Node<T>
}

const create = <T>(val: T, right: Node<T> | null = null, left: Node<T> | null = null): Node<T> => ({
  value: (): T => val,
  left: (): Nullable<Node<T>> => left,
  right: (): Nullable<Node<T>> => right,
  link: (right: Node<T>, left: Nullable<Node<T>> = null) => create(val, right, left),
})

export default { create }
