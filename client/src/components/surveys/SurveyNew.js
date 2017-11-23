//parent survey component
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showReview: false
  };
  renderContent() {
    if (this.state.showReview) {
      return (
        <div>
          <h2>Survey Review</h2>
          <SurveyReview onCancel={() => this.setState({ showReview: false })} />
        </div>
      );
    }
    return (
      <div>
        <h2>New Survey</h2>
        <SurveyForm
          onSurveySubmit={() => this.setState({ showReview: true })}
        />
      </div>
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm' //used to clear the old values from survey form - will reset destroyOnUnmount prop
})(SurveyNew);
