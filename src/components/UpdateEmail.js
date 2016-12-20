import React, { Component } from 'react';
import { Link } from 'react-router';
import Spinner from 'react-spinkit';
import { authRef } from '../reference';

export default class UpdateEmail extends Component {
  state = {
    email: '',
    error: '',
    success: false,
    working: false,
  }

  handleUpdateEmail = (event) => {
    event.preventDefault();
    const newEmail = this.state.email;
    if (newEmail) {
      this.setState({ working: true });

      authRef
        .currentUser
        .updateEmail(newEmail)
        .then(() => {
          this.setState({ success: true, working: false });
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
      success,
      working,
    } = this.state;

    let component;
    if (working) {
      component = <Spinner spinnerName="three-bounce" />;
    } else if (success) {
      component = (
        <div className="success">
          Email successfully changed to {email}!
        </div>
      );
    } else {
      component = (
        <form onSubmit={this.handleUpdateEmail}>

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
            value="UPDATE EMAIL ADDRESS"
          />

        </form>
      );
    }

    return (
      <div className="UpdateEmail">
        <Link to="/home">Back</Link>
        <h1>Update Email Address</h1>
        {component}
      </div>
    );
  }
}
