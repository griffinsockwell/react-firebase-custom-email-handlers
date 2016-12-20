import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class SignIn extends Component {
  state = {
    email: '',
    error: '',
    password: '',
    working: false,
  }

  handleSignIn = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.setState({ working: true });

      authRef
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          browserHistory.push('/home');
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

  render() {
    const {
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
        <form onSubmit={this.handleSignIn}>

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
            type="submit"
            value="SIGN IN"
          />

        </form>
      );
    }

    return component;
  }
}
