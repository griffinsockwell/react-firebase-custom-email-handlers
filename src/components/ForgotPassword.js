import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class ForgotPassword extends Component {
  state = {
    email: '',
    error: '',
    formSent: false,
    working: false,
  }

  handleSendReset = (event) => {
    event.preventDefault();
    const { email } = this.state;

    if (email) {
      this.setState({ working: true });

      authRef
        .sendPasswordResetEmail(email)
        .then(() => {
          this.setState({ formSent: true, working: false });
        }, error => {
          this.setState({ error: error.message, working: false });
        });
    }
  }

  setEmailText = (evt) => {
    this.setState({ email: evt.target.value });
  }

  render() {
    const {
      email,
      error,
      formSent,
      working,
    } = this.state;

    let component;
    if (working) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (formSent) {
      component = (
        <div className="success">
          An email to reset your password has been sent!
        </div>
      );
    } else {
      component = (
        <form onSubmit={this.handleSendReset}>

          {error ? <div className="error">{error}</div> : ''}

          <input
            onChange={this.setEmailText}
            value={email}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            type="submit"
            value="SEND RESET EMAIL"
          />

        </form>
      );
    }

    return component;
  }
}
