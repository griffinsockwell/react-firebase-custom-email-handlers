import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class ResetPassword extends Component {
  state = {
    email: null,
    error: '',
    password: '',
    success: false,
    validCode: null,
    verifiedCode: false,
  }

  componentDidMount() {
    // Verify the password reset code is valid.
    authRef
      .verifyPasswordResetCode(this.props.actionCode)
      .then(email => {
        this.setState({ email, validCode: true, verifiedCode: true });
      }, error => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        this.setState({ error: error.message, validCode: false, verifiedCode: true });
      });
  }

  handleResetPassword = (event) => {
    event.preventDefault();
    const { actionCode } = this.props;
    const newPassword = this.state.password;

    // Save the new password.
    authRef
      .confirmPasswordReset(actionCode, newPassword)
      .then(() => {
        // Password reset has been confirmed and new password updated.
        this.setState({ success: true });
      }, error => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        this.setState({ error: error.message });
      });
  }

  setText = (evt) => {
    this.setState({ password: evt.target.value });
  }

  render() {
    const {
      email,
      error,
      password,
      success,
      validCode,
      verifiedCode,
    } = this.state;

    let component;
    if (!verifiedCode) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (success) {
      component = (
        <div className="ResetPassword">
          <h1>Password changed</h1>
          <p>You can now sign in with your new password</p>
        </div>
      );
    } else if (verifiedCode && validCode) {
      component = (
        <div className="ResetPassword">
          <h1>Reset your password</h1>
          <div>for <span>{email}</span></div>

          <form onSubmit={this.handleResetPassword}>

            {error ? <div className="error">{error}</div> : ''}

            <input
              onChange={this.setText}
              value={password}
              type="password"
              placeholder="New password"
              required
            />
            <input
              type="submit"
              value="SAVE"
            />
          </form>
        </div>
      );
    } else if (verifiedCode && !validCode) {
      component = (
        <div className="ResetPassword">
          <h1>Try resetting your password again</h1>
          <p className="error">{error}</p>
        </div>
      );
    }

    return component;
  }
}
