import actionTypes from '../constants'

export default (state = null, action) => {
  switch(action.type){
    case actionTypes.NEW_SESSION: {
      return action.payload
    }
    default:
      return state
  }
}