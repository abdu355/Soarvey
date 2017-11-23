import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//stripe wrapper
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    //we now have the auth state as a prop - we can use this to render diff contents in the Header or display user info
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google"> Login With Google </a>
          </li>
        );
      default:
        //we need to make sure the cookie is unset on logout
        //return an array of list elements
        return [
          <li key="1">
            <Payments />
          </li>,
          <li style={{ margin: '0 10px' }} key="3">
            Credits: {this.props.user.credits}
          </li>,
          <li key="2">
            <a href="/api/logout"> Logout </a>
          </li>
        ];
    }
  }
  render() {
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.user ? '/surveys' : '/'} //true go to surveys else go to root
            className="left brand-logo"
            style={{ margin: '0 10px' }}
          >
            Soarvey
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  //get only auth object of state {auth} - we are really getting state.auth

  //state is fetched from redux store

  //shorthand for auth : auth - which comes from state.auth
  return { user: auth };
  //this will return the state that we use to determine if user is logged in or not (either false, null, or data is returned) we can use the state as a prop after mapping  it with conenct using react-redux
};
export default connect(mapStateToProps)(Header);
