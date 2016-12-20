import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class VerifyEmail extends Component {
  state = {
    error: '',
    validCode: null,
    verifiedCode: false,
  }

  componentDidMount() {
    // Try to apply the email verification code.
    authRef
      .applyActionCode(this.props.actionCode)
      .then(() => {
        // Email address has been verified.
        this.setState({ validCode: true, verifiedCode: true });
      }, error => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        this.setState({ error: error.message, validCode: false, verifiedCode: true });
      });
  }

  render() {
    const {
      error,
      validCode,
      verifiedCode,
    } = this.state;

    let component;
    if (!verifiedCode) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (verifiedCode && validCode) {
      component = (
        <div className="VerifyEmail">
          <h1>Your email has been verified</h1>
          <p>You can now sign in with your new account</p>
        </div>
      );
    } else if (verifiedCode && !validCode) {
      component = (
        <div className="VerifyEmail">
          <h1>Try verifying your email again</h1>
          <p className="error">{error}</p>
        </div>
      );
    }

    return component;
  }
}
