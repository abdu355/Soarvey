//shows form input for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';
import formFields from './formFields';

const SurveyReview = props => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{props.formValues[field.name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5> Please confirm your entries </h5>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        onClick={() => props.submitSurvey(props.formValues, props.history)}
        className="green white-text btn-flat right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  //console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));

//formValues[field.name] is equivalent tp formValues.title for example
//submitSurvey is an action creator
//withRouter adds history prop that can use to reference our react router
