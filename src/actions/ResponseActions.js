import actionType from '../constants'
import { pushResponse } from '../FirebaseService'

export const addResponse = (sessionId, vis, truth, reported) => {
  return {
    type: actionType.ADD_RESP,
    payload: pushResponse(sessionId, {
      vis,
      truth,
      reported
    })
  }
}