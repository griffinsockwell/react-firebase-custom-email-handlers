import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { authRef } from '../reference';

export default class Home extends Component {
  state = {
    emailSent: false,
    user: null,
  }

  componentDidMount() {
    authRef.onAuthStateChanged(user => {
      if (!user) {
        browserHistory.push('/');
      } else {
        this.setState({ user });
      }
    });
  }

  handleSendEmailVerification = () => {
    authRef
      .currentUser
      .sendEmailVerification()
      .then(() => {
        this.setState({ emailSent: true });
      });
  }

  handleSignOut = () => {
    authRef
      .signOut()
      .then(() => {
        browserHistory.push('/');
      });
  }

  render() {
    const { emailSent, user } = this.state;

    const email = user ? user.email : null;
    const emailVerified = user ? user.emailVerified : null;
    const sendEmail = emailSent
      ? <div className="success">Verification email sent!</div>
      : (<button onClick={this.handleSendEmailVerification}>
          SEND VERIFICATION EMAIL
      </button>);

    return (
      <div className="Home">

        <div className="Home-section">
          Email: {email}
        </div>

        <div className="Home-section">
          {emailVerified
            ? <div>Your email is verified!</div>
            : sendEmail}
        </div>

        <div className="Home-section">
          <Link to="/home/update-email">Update Email</Link>
        </div>

        <div className="Home-section">
          <Link to="/home/update-password">Update Password</Link>
        </div>

        <div className="Home-section">
          <button onClick={this.handleSignOut}>SIGN OUT</button>
        </div>

      </div>
    );
  }
}
