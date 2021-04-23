import Module from '@/core/module'
import Nodes, { Node, NullableNode } from "@/primitive/node"

export interface Trees {
  create: <T>(root: T) => Tree<T>
}

export interface Tree<T> extends Node<T> {}

export const create = <T>(root: T): Tree<T> => Nodes.create<T>(root, null, null)

export default Module.module<Trees>({ create })
