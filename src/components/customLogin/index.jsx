import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'
import '../../styles.css'

class CustomGoogleLogin extends Component {
  constructor(props,context) {
    super(props,context);
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    console.log(this.context)
    invariant(
            this.context.reactGoogleApi,
            'A <GoogleLogin> can be used only as child or descendant of <GoogleApi> '
        )
  }

  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }

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
  }

  renderDefault() {
    const { buttonText, backgroundColor } = this.props;
    const disabled = this.props.disabled;

    const onClickFunc = disabled ? null :  this.signIn
    const style =  backgroundColor ?  {backgroundColor:backgroundColor} : {}

    return <div onClick={onClickFunc} style={style} className="react-google-oauth-button-main react-google-oauth-button-login">
              <div className="react-google-oauth-button-border">
                <div className="react-google-oauth-button-iconWrapper">
                    <div className="react-google-oauth-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" 
                        viewBox="0 0 48 48" ><g>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                    </div>
                </div>
                <span className="react-google-oauth-button-span">{buttonText}</span>
              </div>
            </div>
  }

  renderCustom() {
    const { tag, buttonText, children } = this.props;
    const disabled = this.props.disabled;

    const Tag = tag

    return <Tag onClick={this.signIn} disabled={disabled} className="react-google-oauth-button-login">
              <span></span>
                {children ? children : buttonText}
            </Tag>
  }

  render() {
    const { tag, style, className, disabledStyle, buttonText, children } = this.props;
    const disabled = this.props.disabled;

    return tag ? this.renderDefault() : this.renderCustom()

  }
}

CustomGoogleLogin.contextTypes = {
  reactGoogleApi : PropTypes.bool
}

CustomGoogleLogin.propTypes = {
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

CustomGoogleLogin.defaultProps = {
  onLoginFailure: f => f,
  onLoginSuccess: f => f,
  tag: 'button',
  buttonText: 'Sign in with Google',
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

export default CustomGoogleLogin;