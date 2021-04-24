import Nodes, { Node, NullableNode, ForwardNode } from '@/primitive/node'
import LinkedLists, { LinkedList } from '@/collections/list/linked/single'
import Modules from '@/core/module'

export interface DoublyLinkedLists {
  create: <T>(val: T) => DoublyLinkedList<T>
}

export interface DoublyLinkedList<T> extends LinkedList<T>, Node<T> {
  tail: Node<T>
  insertHead: (val: T) => DoublyLinkedList<T>
  deleteHead: () => DoublyLinkedList<T>
  insertTail: (val: T) => DoublyLinkedList<T>
  deleteTail: () => DoublyLinkedList<T>
}

const create = <T>(val: T): DoublyLinkedList<T> => {
  const node = Nodes.create(val)
  const linked = LinkedLists.handle(node)

  return {
    ...node,
    ...linked,
    tail: node,
    insertHead,
    deleteHead,
    insertTail,
    deleteTail,
  }
}

function insertHead<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  const node = Nodes.create(val, null, this)
  const list = LinkedLists.handle(node)
  return { ...this, ...node, ...list }
}

// soft delete head, nodes still linked
function deleteHead<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  const head = Nodes.create<T>(this.right!.value, null, this.right!)
  this.right!.left = head

  return { ...LinkedLists.handle(head), ...this }
}

function insertTail<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  return { ...this, tail: Nodes.create(val, this.tail) }
}

function deleteTail<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  return { ...this, tail: { ...this.tail.left!, right: null } }
}

export default Modules.module<DoublyLinkedLists>({ create })
