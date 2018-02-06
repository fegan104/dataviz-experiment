import actionTypes from '../constants'

export default (state = 1, action) => {
  switch(action.type){
    case actionTypes.COUNTER_ADD : {
      return state + 1
    } 
    default:
      return state
  }
}