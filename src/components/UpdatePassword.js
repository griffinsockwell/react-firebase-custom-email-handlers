import React, { Component } from 'react';
import { Link } from 'react-router';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class UpdatePassword extends Component {
  state = {
    error: '',
    password: '',
    success: false,
    working: false,
  }

  handleUpdatePassword = (event) => {
    event.preventDefault();
    const newPassword = this.state.password;
    if (newPassword) {
      this.setState({ working: true });

      authRef
        .currentUser
        .updatePassword(newPassword)
        .then(() => {
          this.setState({ success: true, working: false });
        }, error => {
          this.setState({ error: error.message, working: false });
        });
    }
  }

  setPasswordText = (evt) => {
    this.setState({ password: evt.target.value });
  }

  render() {
    const {
      error,
      password,
      success,
      working,
    } = this.state;

    let component;
    if (working) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (success) {
      component = (
        <div className="success">
          Password successfully changed!
        </div>
      );
    } else {
      component = (
        <form onSubmit={this.handleUpdatePassword}>

          {error ? <div className="error">{error}</div> : ''}

          <input
            onChange={this.setPasswordText}
            value={password}
            type="password"
            placeholder="New Password"
            required
          />
          <input
            type="submit"
            value="UPDATE PASSWORD"
          />

        </form>
      );
    }

    return (
      <div className="UpdateEmail">
        <Link to="/home">Back</Link>
        <h1>Update Password</h1>
        {component}
      </div>
    );
  }
}
