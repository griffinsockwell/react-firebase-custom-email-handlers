import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class RecoverEmail extends Component {
  state = {
    error: '',
    restoredEmail: '',
    resetSent: false,
    validCode: null,
    verifiedCode: false,
  }

  componentDidMount() {
    // Confirm the action code is valid.
    authRef
      .checkActionCode(this.props.actionCode)
      .then(info => {
        // Get the restored email address.
        const restoredEmail = info['data']['email'];
        // Revert to the old email.
        authRef
          .applyActionCode(this.props.actionCode)
          .then(() => {
            // Account email reverted to restoredEmail
            this.setState({ restoredEmail, validCode: true, verifiedCode: true });
          });
      }, error => {
        // Invalid code.
        this.setState({ error: error.message, validCode: false, verifiedCode: true });
      });
  }

  sendReset = () => {
    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    authRef
      .sendPasswordResetEmail(this.state.restoredEmail)
      .then(() => {
        // Password reset confirmation sent. Ask user to check their email.
        this.setState({ resetSent: true });
      });
  }

  render() {
    const {
      error,
      restoredEmail,
      resetSent,
      validCode,
      verifiedCode,
    } = this.state;

    let component;
    if (!verifiedCode) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (resetSent) {
      component = (
        <div className="RecoverEmail">
          <h1>Check your email</h1>
          <p>Follow the instructions sent to <span>{restoredEmail}</span> to recover your password.</p>
        </div>
      );
    } else if (verifiedCode && validCode) {
      component = (
        <div className="RecoverEmail">
          <h1>Updated email address</h1>
          <p>Your sign-in email address has been changed back to <span>{restoredEmail}</span></p>
          <p>If you did not change your sign-in email,
            it is possible someone is trying to access your account and you should
            <button onClick={this.sendReset}>change your password right away</button>
          </p>
        </div>
      );
    } else if (verifiedCode && !validCode) {
      component = (
        <div className="RecoverEmail">
          <h1>Unable to update your email address</h1>
          <p>There was a problem changing your sign-in email back.</p>
          <p className="error">{error}</p>
        </div>
      );
    }

    return component;
  }
}
