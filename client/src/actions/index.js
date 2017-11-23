//combined action creators
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//action creator that will use axios to get current user from Express and dispatch it as an action to the authReducer
export const fetchUser = () => async dispatch => {
  //show where to get current user from - from authRoutes (server side)
  //function (dispatch)
  const res = await axios.get('/api/current_user'); //returns promise
  dispatch({ type: FETCH_USER, payload: res.data }); //disaptch after request is completed and res has been received - we only need data object from result which contains user profile id

  //console.log('fetchUser complete');
};
//get a list of surveys to display them on dashboard
export const fetchSurveys = () => async dispatch => {
  //show where to get current user from - from authRoutes (server side)
  //function (dispatch)
  const res = await axios.get('/api/surveys'); //returns promise
  dispatch({ type: FETCH_SURVEYS, payload: res.data }); //disaptch after request is completed and res has been received - we only need data object from result which contains user profile id

  //console.log('fetchUser complete');
};
//Stripe action
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token); //post token to our express server
  dispatch({ type: FETCH_USER, payload: res.data }); // dispatch fetchuser type cause we only want to update user for credit update - easy shortcut
};
//send out survey to users
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys'); //redirect back to dashboard
  dispatch({ type: FETCH_USER, payload: res.data });
};
