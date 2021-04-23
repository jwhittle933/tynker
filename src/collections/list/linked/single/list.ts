import Nodes, { ForwardNode, NullableNode } from '@/primitive/node'
import { Nullable } from '@/primitive/null'
import Modules from '@/core/module'
import { wbr } from 'typedoc/dist/lib/output/helpers/wbr'

export interface LinkedLists {
  create: <T>(val: T) => LinkedList<T>
  handle: <T>(node: ForwardNode<T>) => LinkedList<T>
}

export interface LinkedList<T> extends ForwardNode<T> {
  read: (n?: number) => T | null
  indexOf: (val: T, offset?: number) => Nullable<number>
  insertAt: (val: T, n?: number) => LinkedList<T>
  deleteAt: (n?: number) => LinkedList<T>
}

const create = <T>(val: T): LinkedList<T> =>
  handle(Nodes.create<T>(val, null, null))

const handle = <T>(node: ForwardNode<T>): LinkedList<T> => ({
  ...node,
  read,
  indexOf,
  insertAt,
  deleteAt,
})

const rotate = <T>(list: LinkedList<T>, n: number = 0): Nullable<ForwardNode<T>> => {
  let current: Nullable<ForwardNode<T>> = list
  if (!current) return null

  let index = 0
  while (index < n) {
    if (!current!.right) return null

    current = current!.right
    index += 1
  }

  return current
}

const nodeValue = <T>(node: Nullable<ForwardNode<T>>): Nullable<T> => node && node!.value || null
const nodeNext = <T>(node: Nullable<ForwardNode<T>>): NullableNode<T> => node && node!.right || null

function read<T>(this: LinkedList<T>, n: number = 0): Nullable<T> {
  if (!n) return this.value

  return nodeValue(rotate(this, n))
}

function indexOf<T>(this: LinkedList<T>, val: T, offset: number = 0): Nullable<number> {
  const data = this.read(offset)

  if (!data) return null
  if (data! === val) return offset

  return this.indexOf(val, offset + 1)
}

function insertAt<T>(this: LinkedList<T>, val: T, n: number = 0): LinkedList<T> {
  if (!n) return { ...this, ...Nodes.create(val, null, this.right) }

  const nodeAtN = rotate(this, n - 1)
  if (!nodeAtN) return this // should this error silently?

  nodeAtN.joinRight(Nodes.create<T>(val, null, nodeAtN.right))
  return this
}

function deleteAt<T>(this: LinkedList<T>, n: number = 0): LinkedList<T> {
  if (!n) return { ...this, ...nodeNext(this) }

  const nodeAtN = rotate(this, n - 1)
  if (!nodeAtN) return this

  nodeAtN.joinRight(nodeNext(nodeAtN)!.right!) // handle nulls
  return this
}

export default Modules.module<LinkedLists>({ create, handle })
