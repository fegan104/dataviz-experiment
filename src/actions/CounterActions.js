import actionTypes from '../constants'

export const addToCounter = currentCount => {
  return {
    type: actionTypes.COUNTER_ADD,
    payload: currentCount + 1
  }
}