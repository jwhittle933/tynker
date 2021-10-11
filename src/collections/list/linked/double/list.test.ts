import { describe, it } from 'mocha'
import { expect } from 'chai'
import DLL from './list'

describe('DoublyLinkedList', () => {
  describe('create', () => {
    describe('When list is created with 1 value', () => {
      const actual = DLL.create(10)

      it('should a value of 10', () => {
        expect(actual.value).to.equal(10)
      })

      it('should a tail value of 10', () => {
        expect(actual.tail.value).to.equal(10)
      })

      it('should have a null right node', () => {
        expect(actual.right).to.be.null
      })

      it('should have a null left node', () => {
        expect(actual.left).to.be.null
      })
    })
  })

  describe('insertHead', () => {
    describe('When a new value is inserted at the head', () => {
      const actual = DLL.create(10).insertHead(20)

      it('should have that value at the head', () => {
        expect(actual.value).to.equal(20)
      })

      it('should have the previous head in the second position', () => {
        expect(actual.right!.value).to.equal(10)
      })

      it('should have a null left node', () => {
        expect(actual.left).to.be.null
      })
    })
  })

  describe('deleteHead', () => {
    //
  })

  describe('insertTail', () => {
    //
  })

  describe('deleteTail', () => {
    //
  })
})
