import { cmAlg } from '../util/dataUtil'
import actionType from '../constants'

export const changeData = () => {
  return {
    type: actionType.CHANGE_DATA,
    payload: cmAlg()
  }
}