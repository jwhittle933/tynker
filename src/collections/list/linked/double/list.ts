import Nodes, { Node } from '@/primitive/node'
import LinkedLists, { LinkedList } from '@/collections/list/linked/single'
import Modules from '@/core/module'

export interface DoublyLinkedList<T> extends LinkedList<T>{
  tail: () => Node<T>
  insertHead: (val: T) => DoublyLinkedList<T>
  insertTail: (val: T) => DoublyLinkedList<T>
}

const create = <T>(val: T): DoublyLinkedList<T> => {
  return {
    ...LinkedLists.create(val),
    tail: () => val,
    insertHead,
    insertTail
  }
}

function insertHead<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {


  return this
}

function insertTail<T>(this: DoublyLinkedList<T>): DoublyLinkedList<T> {


  return this
}


export default { create }
