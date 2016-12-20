import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class SignUp extends Component {
  state = {
    confirmPassword: '',
    email: '',
    error: '',
    password: '',
    working: false,
  }

  handleSignUp = (event) => {
    event.preventDefault();
    const { confirmPassword, email, password } = this.state;

    if (email && password === confirmPassword) {
      this.setState({ working: true });

      authRef
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          browserHistory.push('/home')
        }, error => {
          this.setState({ error: error.message, working: false });
        });
    }
  }

  setEmailText = (evt) => {
    this.setState({ email: evt.target.value });
  }

  setPasswordText = (evt) => {
    this.setState({ password: evt.target.value });
  }

  setConfirmPasswordText = (evt) => {
    this.setState({ confirmPassword: evt.target.value });
  }

  render() {
    const {
      confirmPassword,
      email,
      error,
      password,
      working,
    } = this.state;

    let component;
    if (working) {
      component = <Spinner spinnerName="three-bounce" />;
    } else {
      component = (
        <form onSubmit={this.handleSignUp}>

          {error ? <div className="error">{error}</div> : ''}

          <input
            onChange={this.setEmailText}
            value={email}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            onChange={this.setPasswordText}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <input
            onChange={this.setConfirmPasswordText}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <input
            type="submit"
            value="SIGN UP"
          />

        </form>
      );
    }

    return component;
  }
}
