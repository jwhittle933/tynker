import { describe, it } from 'mocha'
import { expect } from 'chai'
import LinkedLists from './list'
import Nodes from '@/primitive/node'

describe('LinkedList', () => {
  describe('LinkedList.create/LinkedList.handle', () => {
    const actual = LinkedLists.create<number>(10) // reconsider method name

    it('should return a list with the correct value', function () {
      expect(actual.value).to.be.equal(10)
    })

    it('should return a list with null right node', function () {
      expect(actual.right).to.be.equal(null)
    })
  })

  describe('When a LinkedList is created from detached node', () => {
    const node = Nodes.create(10)
    const actual = LinkedLists.handle(node)

    it('should return a list with the correct value', function () {
      expect(actual).to.contain({ value: 10 })
    })

    it('should return a list with null right node', function () {
      expect(actual.right).to.be.equal(null)
    })
  })

  describe('LinkedList.read', () => {
    const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
    const list = LinkedLists.handle(head)

    it(`should return the first node's value with no arguments`, () => {
      const actual = list.read()
      expect(actual).to.equal(10)
    })

    it(`should return the first node's value at index 0`, () => {
      const actual = list.read(0)
      expect(actual).to.equal(10)
    })

    it(`should return the second node's value at index 1`, () => {
      const actual = list.read(1)
      expect(actual).to.equal(15)
    })

    it(`should return the third node's value at index 2`, () => {
      const actual = list.read(2)
      expect(actual).to.equal(20)
    })

    it(`should return null at index 3`, () => {
      const actual = list.read(4)
      expect(actual).to.be.null
    })
  })

  describe('LinkedList.indexOf', () => {
    const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
    const list = LinkedLists.handle(head)

    it('should return 0 for first node', () => {
      const actual = list.indexOf(10)
      expect(actual).to.equal(0)
    })

    it('should return 1 for second node', () => {
      const actual = list.indexOf(15)
      expect(actual).to.equal(1)
    })

    it('should return 2 for third node', () => {
      const actual = list.indexOf(20)
      expect(actual).to.equal(2)
    })

    it('should return null for not found value', () => {
      const actual = list.indexOf(100)
      expect(actual).to.equal(null)
    })
  })

  describe('LinkedList.insertAt', () => {
    const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
    const list = LinkedLists.handle(head)

    it('should insert at 0 with no index argument', () => {
      const actual = list.insertAt(100)
      expect(actual.indexOf(100)).to.be.equal(0)
    })

    it('should insert at 1', () => {
      const actual = list.insertAt(101, 1)
      expect(actual.indexOf(101)).to.be.equal(1)
    })

    it('should insert at 2', () => {
      const actual = list.insertAt(102, 2)
      expect(actual.indexOf(102)).to.be.equal(2)
    })

    it('should not insert when index out of range', () => {
      const actual = list.insertAt(103, 10)
      expect(actual.indexOf(103)).to.be.null
    })
  })

  describe('LinkedList.collect', () => {
    const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
    const list = LinkedLists.handle(head)

    it('should return a List of 3 items', () => {
      const actual = list.collect()
      expect(actual.length).to.be.equal(3)
    })
  })

  describe('LinkedList.deleteAt', () => {
    describe('When deleting the first node', () => {
      const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
      const list = LinkedLists.handle(head)
      const actual = list.deleteAt()

      it('should not be found in the list', () => {
        expect(actual.indexOf(10)).to.be.null
      })

      it('should only have a length of 2', () => {
        expect(actual.collect().length).to.equal(2)
      })
    })

    describe('When deleting the second node', () => {
      const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
      const list = LinkedLists.handle(head)
      const actual = list.deleteAt(1)

      it('should not be found in the list', () => {
        expect(actual.indexOf(15)).to.be.null
      })

      it('should only have a length of 2', () => {
        expect(actual.collect().length).to.equal(2)
      })
    })

    describe('When deleting the third node', () => {
      const head = Nodes.create(10, null, Nodes.create(15, null, Nodes.create(20)))
      const list = LinkedLists.handle(head)
      const actual = list.deleteAt(2)

      it('should not be found in the list', () => {
        expect(actual.indexOf(20)).to.be.null
      })

      it('should only have a length of 2', () => {
        expect(actual.collect().length).to.equal(2)
      })
    })
  })
})
