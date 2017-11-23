//root component
import React, { Component } from 'react';

//BR: tells react how to behave, Route: sets a rule b/w route and visible comp
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; //allows components to call actionCreators
import * as actions from '../actions'; //imports all actionCreators as actions

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//BrowserRouter accepts one component (child) only
//warning : route path uses string 'contains' to check url by defualt. to fix this use exact prop
//add class container on root div for spacing on edges
class App extends Component {
  componentDidMount() {
    //console.log('mounted')
    this.props.fetchUser(); //prop function from connect (actioncreator)
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//connect(mapstatetoprops, actioncrator)(component)
export default connect(null, actions)(App); //actions are assigned to app component as props - this allows us to access the functions as props
