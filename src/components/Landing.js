import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ForgotPassword from './ForgotPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { authRef } from '../reference';

export default class Landing extends Component {
  componentDidMount() {
    authRef.onAuthStateChanged(user => {
      if (user) {
        browserHistory.push('/home');
      }
    });
  }

  render() {
    return (
      <div className="Landing">

        <h1>Sign In</h1>
        <SignIn />

        <h1>Forgot Password</h1>
        <ForgotPassword />

        <h1>Sign Up</h1>
        <SignUp />

      </div>
    );
  }
}
