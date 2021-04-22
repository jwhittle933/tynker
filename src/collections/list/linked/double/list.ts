import Nodes, { Node } from '@/primitive/node'
import LinkedLists, { LinkedList } from '@/collections/list/linked/single'
import Modules from '@/core/module'

export interface DoublyLinkedLists {
  create: <T>(val: T) => DoublyLinkedList<T>
}

export interface DoublyLinkedList<T> extends LinkedList<T>{
  tail: () => Node<T>
  insertHead: (val: T) => DoublyLinkedList<T>
  deleteHead: () => DoublyLinkedList<T>
  insertTail: (val: T) => DoublyLinkedList<T>
  deleteTail: () => DoublyLinkedList<T>
}

const create = <T>(val: T): DoublyLinkedList<T> => {
  const linked = LinkedLists.create(val)

  return {
    ...linked,
    tail: () => linked.head(),
    insertHead,
    deleteHead,
    insertTail,
    deleteTail
  }
}

function insertHead<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  return ({ ...this, head: () => Nodes.create(val, this.head()) })
}

// soft delete head, nodes still linked
function deleteHead<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  const head = Nodes.join(
    null,
    Nodes.create<T>(this.head().right()!.value(), this.head().right(), null),
    this.head().right()!,
)

  return { ...this, head: () => head }
}

function insertTail<T>(this: DoublyLinkedList<T>, val: T): DoublyLinkedList<T> {
  const tail = Nodes.create(val, null, this.head())
  Nodes.join(null, this.tail(), tail)

  return { ...this, tail: () => tail}
}

function deleteTail<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {
  const tail = Nodes.join(
    this.tail().left()!,
    Nodes.create<T>(this.tail().left()!.value(), null, this.tail().left())
  )

  return { ...this, tail: () => tail }
}


export default Modules.module<DoublyLinkedLists>({ create })
