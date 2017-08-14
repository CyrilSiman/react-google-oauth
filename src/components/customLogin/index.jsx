import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'
import '../../styles.css'

class CustomGoogleLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    invariant(
      this.context.reactGoogleApi,
      'A <CustomGoogleLogin> can be used only as child or descendant of <GoogleApi> '
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
    const { tag, className, text, children } = this.props;
    const disabled = this.props.disabled;

    const Tag = tag

    return tag === "a" ?
      <Tag href="javacript:void(0)" onClick={this.signIn} disabled={disabled} className={className} >
        {children ? children : text}
      </Tag>
      : <Tag onClick={this.signIn} disabled={disabled} className={className} >
        {children ? children : text}
      </Tag>
  }
}

CustomGoogleLogin.contextTypes = {
  reactGoogleApi: PropTypes.bool
}

CustomGoogleLogin.propTypes = {
  onLoginSuccess: PropTypes.func,
  onLoginFailure: PropTypes.func,
  onRequest: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  tag: PropTypes.string,
};

CustomGoogleLogin.defaultProps = {
  onLoginFailure: f => f,
  onLoginSuccess: f => f,
  onRequest: f => f,
  tag: "a",
  text: 'Sign in with Google',
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup'
};

export default CustomGoogleLogin;