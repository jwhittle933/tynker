import Nodes, { Node } from '@/primitive/node'
import LinkedLists, { LinkedList } from '@/collections/list/linked/single'
import Modules from '@/core/module'

export interface DoublyLinkedLists {
  create: <T>(val: T) => DoublyLinkedList<T>
}

export interface DoublyLinkedList<T> extends LinkedList<T> {
  tail: Node<T>
  insertHead: (val: T) => DoublyLinkedList<T>
  deleteHead: () => DoublyLinkedList<T>
  insertTail: (val: T) => DoublyLinkedList<T>
  deleteTail: () => DoublyLinkedList<T>
}

const create = <T>(val: T): DoublyLinkedList<T> => {
  const linked = LinkedLists.create(val)

  return {
    ...linked,
    tail: linked.head,
    insertHead,
    deleteHead,
    insertTail,
    deleteTail,
  }
}

function insertHead<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  return { ...this, head: Nodes.create(val, null, this.head) }
}

// soft delete head, nodes still linked
function deleteHead<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  const head = Nodes.create<T>(this.head!.right!.value, null, this.head.right!)
  this.head.right!.left = head

  return { ...this, head: head }
}

function insertTail<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  return { ...this, tail: Nodes.create(val, this.tail) }
}

function deleteTail<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  return { ...this, tail: { ...this.tail.left!, right: null } }
}

export default Modules.module<DoublyLinkedLists>({ create })
