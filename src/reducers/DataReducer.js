import actionType from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case actionType.CHANGE_DATA: {
      return action.payload
    }
    default:
      return state
  }
}