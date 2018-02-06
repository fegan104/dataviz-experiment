import actionTypes from '../constants'
import { randomString } from '../util/stringUtil'

export const newSession = () => {
  return {
    type: actionTypes.NEW_SESSION,
    payload: randomString()
  }
}