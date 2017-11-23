//render labels and text input
import React from 'react';

//reduxForm passes handlers as props automatically to this component and will watch any changes in the value of our input field in this component

//we can get input props and pass them all to input field like so:
//{...input} means assign all props : onBlur={..} onChange={...} etc..
export default ({ input, label, meta: { error, touched } }) => {
  //console.log(meta);

  //if touched is true and there is an error then show that error. touched will be false if the user hasnt clicked on the field
  //touched returns a boolean
  //error is a function that returns the error string for the specific field

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '20px' }} />
      <div style={{ marginBottom: '20px' }} className="red-text">
        {touched && error}
      </div>
    </div>
  );
};
