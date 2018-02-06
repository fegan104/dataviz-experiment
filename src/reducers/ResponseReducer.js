import actionType from '../constants'

export default (state = [], action) => {
  switch(action.type){
    case actionType.ADD_RESP_FULFILLED: {
      return [...state, action.payload]
    }
    default:
      return state
  }
}