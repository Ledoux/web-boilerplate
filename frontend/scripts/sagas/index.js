import { fork } from 'redux-saga/effects'

import * as foosSagas from './foos'

function getSagasFromImportObject (importObject) {
  return Object.keys(importObject)
  // filter only the watch function
  .filter(key => /^watch/.test(key))
  .map(key => importObject[key])
  // filter out other keys on import object
  .filter(saga => typeof saga === 'function')
}

export default function * rootSaga () {
  yield [
    ...getSagasFromImportObject(foosSagas)
  ].map(fork)
}
