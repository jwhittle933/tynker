import { Enumerable } from '@/collections/enum'
import Trees, { Tree } from '@/collections/tree'
import Modules from '@/core/module'
import { Nullable } from '@/primitive/null'
import { NullableNode } from '@/primitive/node'

export interface Comparator<T> {
  (value: T): boolean
}

export interface BinarySearchTrees {
  create: <T>(root: T) => BinarySearchTree<T>
}

export interface BinarySearchTree<T> extends Tree<T> {
}

export const create = <T>(root: T): BinarySearchTree<T> =>
  ({ ...Trees.create<T>(root) })

export const fromEnumerable = <T>({ iter }: Enumerable<T>): BinarySearchTree<T> => {
  //
}

const search = <T>(node: NullableNode<T>, value: T): NullableNode<T> => {
  if (!node) return null

  if (node.value === value) return node
  if (value < node.value) return search(node.left!, value)
  return search(node.right!, value)
}

export default Modules.module<BinarySearchTrees>({ create })