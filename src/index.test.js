import { expect } from 'chai'
import Library from '../src/index'

let lib;

describe('Given an instance of my library',  () => {
  before(() => {
    lib = new Library()
  })
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Library')
    })
  })
})
