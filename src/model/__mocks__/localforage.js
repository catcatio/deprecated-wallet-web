/* eslint-env jest */

const localforage = jest.genMockFromModule('localforage')

let _localforage = {}
localforage.setItem = (key, value) => {
  _localforage[key] = value
  return true
}

localforage.getItem = key => _localforage[key]

module.exports = localforage
