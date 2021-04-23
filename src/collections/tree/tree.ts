import Module from '@/core/module'
import Nodes, { Node, NullableNode } from "@/primitive/node"

export interface Trees {
  create: <T>(root: T) => Tree<T>
}

export interface Tree<T> {
  root: Node<T>
}

export const create = <T>(root: T): Tree<T> => {
  return { root: Nodes.create<T>(root) }
}

export default Module.module<Trees>({ create })
