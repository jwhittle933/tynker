import thread from './thread'
import { describe } from 'mocha'
import { expect } from 'chai'

// ----- threading functons
const remove = (str: string, rep: string): string => str.replace(rep, '///')
const upper = (str: string): string => str.toUpperCase()
const lower = (str: string): string => str.toLowerCase()
const lookup = <V>(obj: Record<string, V>, find: string): V => obj[find]
const sort = (list: string[]) => list.sort()
const filter = (list: string[], out: string) => list.filter((s) => s !== out)
const double = (list: string[]) => list.map((s) => s + s)
// ----- threading functons

describe.only('Thread', () => {
  describe('strings', () => {
    describe('Thread.first', () => {
      describe('string manipulation', () => {
        it(`should replace 'est' with '///' and upper case`, () => {
          const actual = thread.first('testing', [[remove, 'est'], [upper]])
          expect(actual).to.equal('T///ING')
        })
      })

      describe('find value in object based on key', () => {
        it('should perform two object lookups and upper the resulting string', () => {
          const actual = thread.first({ test: { next: 'lower' }, another: 'thing' }, [
            [lookup, 'test'],
            [lookup, 'next'],
            [upper],
          ])
          expect(actual).to.equal('LOWER')
        })
      })

      describe('walk an object path', () => {
        it('should walk an object key path and return the correct value', () => {
          const actual = thread.first({ first: { second: { third: { fourth: 'value' } } } }, [
            [lookup, 'first'],
            [lookup, 'second'],
            [lookup, 'third'],
            [lookup, 'fourth'],
          ])
          expect(actual).to.equal('value')
        })
      })

      describe('manipulate an array', () => {
        it('should filter a string, double each, and sort', () => {
          const actual = thread.first(
            ['gamma', 'beta', 'epsilon', 'delta', 'alpha'],
            [[filter, 'gamma'], [filter, 'delta'], [sort], [double]],
          )
          expect(actual).to.deep.equal(['alphaalpha', 'betabeta', 'epsilonepsilon'])
        })
      })
    })

    describe('Thread.last', () => {
      it(`should replace 'EST' with '///' and lower case`, () => {
        const actual = thread.last('EST', [[remove, 'TESTING'], [lower]])
        expect(actual).to.equal('t///ing')
      })
    })
  })
})
