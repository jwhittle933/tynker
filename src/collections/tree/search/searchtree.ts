import { Enumerable } from '@/collections/enum'
import Trees, { Tree } from '@/collections/tree'
import Modules from '@/core/module'
import { NullableNode } from '@/primitive/node'
import Lists from '@/collections/list'

export interface Comparator<T> {
  (value: T): boolean
}

export interface BinarySearchTrees {
  create: <T>(root: T) => BinarySearchTree<T>
}

export interface BinarySearchTree<T> extends Tree<T> {}

export const create = <T>(root: T): BinarySearchTree<T> =>
  ({ ...Trees.create<T>(root) })

export const fromEnumerable = <T>({ iter }: Enumerable<T>): BinarySearchTree<T> => {
  const list = Lists.new(iter().sort())

  const mid = Math.floor(list.length / 2)
  const left = list.slice(0, mid)
  const right = list.slice(mid + 1, list.length)

  const tree = create<T>(list[mid])





  return tree
}

const search = <T>(node: NullableNode<T>, value: T): NullableNode<T> => {
  if (!node) return null

  if (node.value === value) return node
  if (value < node.value) return search(node.left!, value)
  return search(node.right!, value)
}

function insert<T>(this: BinarySearchTree<T>, val: T): BinarySearchTree<T> {
  //


  return this
}

export default Modules.module<BinarySearchTrees>({ create })
