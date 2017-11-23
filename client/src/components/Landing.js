import React, { Component } from 'react';
//import { connect } from 'react-redux';

export default class Landing extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#f9f9f9',
          marginTop: '15px',
          paddingTop: '200px',
          height: 'auto',
          textAlign: 'center'
        }}
      >
        <div>
          <h1> Soarvey</h1>
          <h4>Collect feedback from your users</h4>
        </div>
        <div>
          <p className="container" style={style}>
            <img
              alt="animation"
              src={
                'https://cdn.dribbble.com/users/493409/screenshots/3070302/043_success-mail.gif'
              }
            />
          </p>
        </div>
      </div>
    );
  }
}
const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '..',
  height: '..',
  marginTop: '10px'
};
