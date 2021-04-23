import Nodes, { Node, NullableNode } from '@/primitive/node'
import { Nullable } from '@/primitive/null'

export interface LinkedList<T> extends Node<T> {
  read: (n: number) => T | null
  indexOf: (val: T, offset: number) => Nullable<number>
  insertAt: (val: T, n: number) => LinkedList<T>
  deleteAt: (n: number) => LinkedList<T>
}

const create = <T>(val: T): LinkedList<T> => ({
  ...Nodes.create<T>(val, null, null),
  read,
  indexOf,
  insertAt,
  deleteAt,
})

const rotate = <T>(list: LinkedList<T>, n: number = 0): NullableNode<T> => {
  if (n === 0) return list

  let current: NullableNode<T> = list.right
  let index = 0

  while (index < n) {
    current = current!.right
    index += 1

    if (!current) return null
  }

  return current
}

function read<T>(this: LinkedList<T>, n: number = 0): Nullable<T> {
  const node = rotate(this, n)
  return (node && node!.value) || null
}

function indexOf<T>(this: LinkedList<T>, val: T, offset: number = 0): Nullable<number> {
  const data = this.read(offset)

  if (!data) return null
  if (data! === val) return offset

  return this.indexOf(val, offset + 1)
}

function insertAt<T>(this: LinkedList<T>, val: T, n: number = 0): LinkedList<T> {
  if (!n) return { ...this, ...Nodes.create(val, null, this) }

  const nodeAtN = rotate(this, n - 1)
  if (!nodeAtN) return this // should this error silently?

  nodeAtN.joinRight(Nodes.create<T>(val, null, nodeAtN.right))
  return this
}

function deleteAt<T>(this: LinkedList<T>, n: number): LinkedList<T> {
  if (!n) return { ...this, ...this.right! }

  const nodeAtN = rotate(this, n - 1)
  if (!nodeAtN) return this

  nodeAtN.joinRight(nodeAtN!.right!.right!) // handle nulls
  return this
}

export default { create }
