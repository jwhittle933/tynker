import Result from '@/core/result'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('Results', () => {
  describe('Results.wrap', () => {
    const actual = Result.wrap(10)

    it('should return an new result of Ok', () => {
      expect(actual).to.contain({ value: 10 })
    })
  })

  describe('Results.wrapErr', () => {
    const actual = Result.wrapErr('There was an error')

    it('should return an new result of Err', () => {
      expect(actual).to.contain({ error: 'There was an error' })
    })
  })

  describe('Results.unwrap', () => {
    it('should unwrap the wrapped value and return', () => {
      const r = Result.wrap(10)
      let actual = Result.unwrap(r)
      expect(actual).to.equal(10)
    })

    it('should return null when not Ok', () => {
      const r = Result.wrapErr('e')
      let actual = Result.unwrap(r)

      expect(actual).to.equal(null)
    })
  })

  describe('Results.expect', () => {
    it('should unwrap the wrapped value and return', () => {
      const r = Result.wrap(10)
      let actual = Result.expect(r, 'should not throw')
      expect(actual).to.equal(10)
    })

    it('should throw an error', () => {
      const r = Result.wrapErr('e')

      try {
        Result.expect(r, 'this should throw')
      } catch (e) {
        expect(e).not.to.be.undefined
        expect(e.message).to.equal('this should throw')
      }
    })
  })

  describe('Results.isOk', () => {
    describe('When Ok is wrapped', () => {
      it('should return true', () => {
        const r = Result.wrap(10)
        let actual = Result.isOk(r)
        expect(actual).to.be.true
      })
    })

    describe('When Err is wrapped', () => {
      it('should return false', () => {
        const r = Result.wrapErr(10)
        let actual = Result.isOk(r)
        expect(actual).to.be.false
      })
    })
  })

  describe('Results.isErr', () => {
    describe('When Ok is wrapped', () => {
      it('should return true', () => {
        const r = Result.wrap(10)
        let actual = Result.isErr(r)
        expect(actual).to.be.false
      })
    })

    describe('When Err is wrapped', () => {
      it('should return false', () => {
        const r = Result.wrapErr(10)
        let actual = Result.isErr(r)
        expect(actual).to.be.true
      })
    })
  })

  describe('Results.ok', () => {
    describe('When Ok is wrapped', () => {
      it('should return Option(Some(value))', () => {
        const r = Result.wrap(10)
        let actual = Result.ok(r)
        expect(actual.isSome()).to.be.true
      })
    })

    describe('When Err is wrapped', () => {
      it('should return Option(None)', () => {
        const r = Result.wrapErr(10)
        let actual = Result.ok(r)
        expect(actual.isSome()).to.be.false
      })
    })
  })

  describe('Results.err', () => {
    describe('When Ok is wrapped', () => {
      it('should return true', () => {
        const r = Result.wrap(10)
        let actual = Result.err(r)
        expect(actual.isSome()).to.be.false
      })
    })

    describe('When Err is wrapped', () => {
      it('should return false', () => {
        const r = Result.wrapErr(10)
        let actual = Result.err(r)
        expect(actual.isSome()).to.be.true
      })
    })
  })
})
