import Nodes, { Node } from '@/primitive/node'

export interface LinkedList<T> {
  head: () => Node<T>
  read: (n: number) => T | null
  indexOf: (val: T) => number
  insertAt: (n: number, val: T) => LinkedList<T>
  deleteAt: (n: number) => LinkedList<T>
}

const create = <T>(val: T): LinkedList<T> => ({ head: () => Nodes.create<T>(val), read, indexOf, insertAt, deleteAt })

function read<T>(this: LinkedList<T>, n: number): T | null {
  let current: Node<T> | null = this.head().next()
  let index: number = 0

  while (index < n) {
    current = current!.next()
    index += 1

    if (!current) return null
  }

  return current!.value()
}

function indexOf<T>(this: LinkedList<T>, val: T): number {
  let current: Node<T> | null = this.head()
  let index = 0

  do {
    if (current.value() === val) return index

    current = current.next()
    index += 1
  } while (current)

  return -1
}

function insertAt<T>(this: LinkedList<T>, n: number, val: T): LinkedList<T> {
  if (!n) return create(Nodes.create<T>(val, this.head()))

  const nodeAtN = windN(this, n - 1)
  nodeAtN.link(Nodes.create<T>(val, nodeAtN.next()!))
  return this
}

function deleteAt<T>(this: LinkedList<T>, n: number): LinkedList<T> {
  if (!n) return create(this.head().next())

  const nodeAtN = windN(this, n - 1)
  nodeAtN.link(nodeAtN.next()!.next()!)
  return this
}

const windN = <T>(list: LinkedList<T>, n: number): Node<T> => {
  let current: Node<T> | null = list.head()
  let index = 0

  while (index < n) {
    current = current!.next()
    index += 1
  }

  return current!
}

export default { create }
