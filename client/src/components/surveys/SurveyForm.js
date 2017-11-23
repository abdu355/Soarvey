//child component
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
//---------Field props:
//name prop is the key to the field in our redux store
//type: input type
//component: can be any custom react component or predefined ones
//-----------------------

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel<i className="material-icons right"> cancel </i>
          </Link>
          <button
            style={{ margin: '0 15px' }}
            className="yellow white-text darken-3 btn-flat left"
          >
            Clear <i className="material-icons right"> clear_all </i>
          </button>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right"> navigate_next </i>
          </button>
        </form>
      </div>
    );
  }
}
function validateForm(values) {
  const errors = {};

  //check emails first
  errors.recipients = validateEmails(values.recipients || ''); //either gets undefined or gets a string returned from our custom validateEmails function
  //we added an empty string so we dont get split on undefined error, this way we ensure that split is not getting an undefined value in our validateEmails function

  //then check if empty
  _.each(formFields, ({ name }) => {
    //get values.name
    if (!values[name]) {
      //get errors.name
      errors[name] = `You must provide the ${name}`;
    }
  });

  return errors;
}

//reduxForm gives us several props that we can use to handle changes in our form, such as handleSubmit
export default reduxForm({
  validate: validateForm, //this function will be used to validate our fields
  form: 'surveyForm', //this will be used to retreive data from redux store (state object) - must be unique
  destroyOnUnmount: false //do not destroy form data on unmount
})(SurveyForm);
