import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'
import '../../styles.css'

class GoogleLogout extends Component {
  constructor(props,context) {
    super(props,context);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    invariant(
            this.context.reactGoogleApi,
            'A <GoogleLogout> can be used only as child or descendant of <GoogleApi> '
        )
  }

  signOut(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
        //if (!this.state.disabled) {
        const authInstance = window.gapi.auth2.getAuthInstance();

        if (authInstance.isSignedIn.get()) {
          const { onLogoutSuccess, onLogoutFailure, onRequest} =  this.props
          
          //Call onRequest function
          onRequest();

          authInstance.signOut()
            .then(
              () => {
                //authInstance.currentUser.get().reloadAuthResponse();
                onLogoutSuccess()
              },
              () => {
                //authInstance.currentUser.get().reloadAuthResponse();
                onLogoutFailure()
              }
            );
        }
  }

  render() {
    const { tag, style, className, disabledStyle, buttonText, children } = this.props;
    const disabled = this.props.disabled;

    const Tag = tag

    return <Tag onClick={this.signOut} disabled={disabled} className="react-google-oauth-button-logout">
            {children ? children : buttonText}
        </Tag>
  }
}
GoogleLogout.contextTypes = {
  reactGoogleApi : PropTypes.bool
}

GoogleLogout.propTypes = {
  onLogoutSuccess: PropTypes.func,
  onLogoutFailure: PropTypes.func,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  loginHint: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
};

GoogleLogout.defaultProps = {
  onLogoutSuccess: f => f,
  onLogoutFailure: f => f,
  onRequest: f => f,
  tag: 'button',
  buttonText: 'Login with Google',
  disabledStyle: {
    opacity: 0.6,
  }
};

export default GoogleLogout;