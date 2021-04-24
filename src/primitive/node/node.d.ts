declare module 'tynker/primitive/node' {
  import { Node, NullableNode } from './node'

  export function create<T>(val: T): Node<T>
  export function create<T>(val: T, left: NullableNode<T>): Node<T>
  export function create<T>(val: T, left: NullableNode<T>, right: NullableNode<T>): Node<T>
}
