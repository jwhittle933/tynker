import { Nullable } from '@/primitive/null'

// Node Interface
// Node<[<- Previous Node][Value][Next Node ->]>

interface ValueNode<T> {
  value: T
  update: <T>(value: T) => Node<T>
}

interface BackwardNode<T> extends ValueNode<T> {
  left: NullableNode<T>
  joinLeft: <T>(left: Node<T>) => Node<T>
  disjoinLeft: <T>() => Node<T>
}

interface ForwardNode<T> extends ValueNode<T> {
  right: NullableNode<T>
  joinRight: <T>(right: Node<T>) => Node<T>
  disjoinRight: <T>() => Node<T>
}

export interface Node<T> extends BackwardNode<T>, ForwardNode<T> {
  join: <T>(left: Node<T>, right: Node<T>) => Node<T>
  disjoin: <T>() => Node<T>
}

export type NullableNode<T> = Nullable<Node<T>>
export type NullNode = Node<null>

const create = <T>(value: T, left: NullableNode<T> = null, right: NullableNode<T> = null): Node<T> => ({
  value,
  left,
  right,
  update,
  join,
  joinRight,
  joinLeft,
  disjoin,
  disjoinLeft,
  disjoinRight,
})

function disjoin<T>(this: Node<T>): Node<T> {
  this.right = null
  this.left = null

  return this
}

function disjoinLeft<T>(this: Node<T>): Node<T> {
  this.left = null
  return this
}

function disjoinRight<T>(this: Node<T>): Node<T> {
  this.right = null
  return this
}

function join<T>(this: Node<T>, left: Node<T>, right: Node<T>) {
  this.left = left
  this.right = right
  return this
}

function joinRight<T>(this: Node<T>, right: Node<T>): Node<T> {
  this.right = right
  return this
}

function joinLeft<T>(this: Node<T>, left: Node<T>): Node<T> {
  this.left = left
  return this
}

function update<T>(this: Node<T>, value: T): Node<T> {
  this.value = value
  return this
}

export default { create }
