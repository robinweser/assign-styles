import assignStyles from '../lib/index'
import { expect } from 'chai'


describe('Assigning styles', () => {

  let emptyAssign = assignStyles()
  it('should return undefined if arguments are empty', () => {
    expect(emptyAssign).to.equal(undefined)
  })

  let onlyOne = assignStyles({foo: 1, bar: 2})
  it('should return the object if only one is passed', () => {
    expect(onlyOne).to.eql({foo: 1, bar: 2})
  })

  let merged = assignStyles({foo: 1}, {bar: 2})
  it('should merge 2 objects', () => {
    expect(merged).to.eql({foo: 1, bar: 2})
  })

  let overwritten = assignStyles({foo: 1}, {foo: 3, bar: 2})
  it('should overwrite existing values', () => {
    expect(overwritten).to.eql({foo: 3, bar: 2})
  })

  let important = assignStyles({foo: '1 !important'}, {
    foo: 3,
    bar: 2
  })
  it('should not overwrite existing values with !important flag', () => {
    expect(important).to.eql({foo: '1 !important', bar: 2})
  })

  let obj1 = {foo: 1, bla: 3}
  let obj2 = {bar: 3}

  let newObj = assignStyles({}, obj1, obj2)
  newObj.bla = 4
  it('should create a new object that is not related to the source objects', () => {
    expect(obj1).to.eql({foo: 1, bla: 3})
    expect(obj2).to.eql({bar: 3})
    expect(newObj).to.eql({foo: 1, bar: 3, bla: 4})
  })

  let obj3 = {foo: 1, bla: {foo: 1,bar: 2}}
  let obj4 = {bar: 3, foo: 5, bla: {foo: 4}}

  let newObj2 = assignStyles({}, obj3, obj4)
  it('should also merge nested objects', () => {
    expect(newObj2).to.eql({
      foo: 5,
      bar: 3,
      bla: {
        foo: 4,
        bar: 2
      }
    })
  })
})