import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'
import {renderDefaultButton} from '../'
import '../../styles.css'

class GoogleLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    invariant(
      this.context.reactGoogleApi,
      'A <GoogleLogin> can be used only as child or descendant of <GoogleApi> '
    )
    invariant(
      React.Children.count(this.props.children) === 0,
      'A <GoogleLogin> can\'t have child, use <CustomGoogleLogin> instead'
    )
  }

  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }

    const auth2 = window.gapi.auth2.getAuthInstance();
    const { onLoginSuccess, onLoginFailure } = this.props
    const { redirectUri, onRequest, fetchBasicProfile, prompt, scope, responseType } = this.props;
    const options = {
      response_type: responseType,
      redirect_uri: redirectUri,
      fetch_basic_profile: fetchBasicProfile,
      prompt,
      scope,
    };
    onRequest();
    if (responseType === 'code') {
      auth2.grantOfflineAccess(options)
        .then(
        res => onLoginSuccess(res),
        err => onLoginFailure(err)
        );
    } else {
      auth2.signIn(options)
        .then(
        res => onLoginSuccess(res),
        err => onLoginFailure(err)
        );
    }
  }

  render() {

    return renderDefaultButton({
      buttonText: this.props.buttonText,
      backgroundColor: this.props.backgroundColor,
      disabled: this.props.disabled,
      className: "react-google-oauth-button-login",
      onClickFunc: this.signIn
    })
  }
}

GoogleLogin.contextTypes = {
  reactGoogleApi: PropTypes.bool
}

GoogleLogin.propTypes = {
  onLoginSuccess: PropTypes.func,
  onLoginFailure: PropTypes.func,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

GoogleLogin.defaultProps = {
  onLoginFailure: f => f,
  onLoginSuccess: f => f,
  onRequest: f => f,
  tag: 'button',
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup'
};

export default GoogleLogin;