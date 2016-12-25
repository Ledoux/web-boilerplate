import { takeEvery } from 'redux-saga'

function * requestGetFoosData (action) {
}

export function * watchRequestGetFooS () {
  yield * takeEvery(['REQUEST_GET_FOOS'], requestGetFoosData)
}
