import { Nullable } from '@/primitive/null'

interface ValueNode<T> {
  value: T
}

interface BackwardNode<T> extends ValueNode<T> {
  left: Nullable<Node<T>>
}

interface ForwardNode<T> extends ValueNode<T> {
  right: Nullable<Node<T>>
}

export interface Node<T> extends BackwardNode<T>, ForwardNode<T> {
  link: (right: Nullable<Node<T>>, left: Nullable<Node<T>> = null) => Node<T>
  unlink: (right: Nullable<Node<T>>, left: Nullable<Node<T>> = null) => Node<T>
}

const create = <T>(left: Nullable<Node<T>>, value: T, right: Nullable<Node<T>>): Node<T> => ({
  value,
  left: left,
  right: right,
  link: (left: Node<T>, right: Nullable<Node<T>> = null) => create(left, value, right),
  unlink: (left: Node<T>, right: Nullable<Node<T>> = null) => create(left, value, right),
})

const join = <T>(left: Nullable<Node<T>>, node: Node<T>, right: Nullable<Node<T>> = null) => ({
  left: () => left,
  ...node,
  right: () => right,
})

const disjoin = <T>(left: Nullable<Node<T>>, node: Node<T>, right: Nullable<Node<T>>) => {

}

export default { create, join }
