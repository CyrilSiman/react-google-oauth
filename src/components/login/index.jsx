import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles.css'

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }

    //if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { onLoginSuccess, onLoginFailure} =  this.props
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
    //}
  }

  /*
  handleSigninSuccess(res) {
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();
    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    };
    this.props.onLoginSuccess(res);
  }
  */

  render() {
    const { tag, style, className, disabledStyle, buttonText, children } = this.props;
    const disabled = this.props.disabled;

    const Tag = tag

    return <Tag onClick={this.signIn} disabled={disabled} className="react-google-oauth-button-login">
            {children ? children : buttonText}
           </Tag>

  }
}

GoogleLogin.propTypes = {
  onLoginSuccess: PropTypes.func,
  onLoginFailure: PropTypes.func,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  loginHint: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array
};

GoogleLogin.defaultProps = {
  onLoginFailure: f => f,
  onLoginSuccess: f => f,
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6,
  },
  onRequest: () => {},
};

export default GoogleLogin;