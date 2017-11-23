import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

//add any link tags for materialize in ../../public/index.html
class Dashboard extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <p className="container" style={style}>
          <img
            alt="loading"
            style={{ style }}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </p>
      );
    } else {
      return (
        <div>
          <h2> Dashboard </h2>
          <SurveyList />
          <div className="fixed-action-btn">
            <Link to="/surveys/new" className="btn-floating btn-large red">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      );
    }
  }
}
const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '..',
  height: '..',
  marginTop: '50px'
};

export default Dashboard;
