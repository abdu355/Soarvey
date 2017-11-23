//Authentication Reducer
import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  //console.log(action);
  //initial state is null
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //returns empty string if user is logged out -we dont want that so we use ('' || false ) to return false if an empty string is returned
    default:
      return state;
  }
}
