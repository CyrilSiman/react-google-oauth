import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'
import {renderDefaultButton} from '../'
import '../../styles.css'

class GoogleLogout extends Component {
  constructor(props, context) {
    super(props, context);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    invariant(
      this.context.reactGoogleApi,
      'A <GoogleLogout> can be used only as child or descendant of <GoogleApi> '
    )
    invariant(
      React.Children.count(this.props.children) === 0,
      'A <GoogleLogout> can\'t have child, use <CustomGoogleLogout> instead'
    )
  }

  signOut(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }

    const authInstance = window.gapi.auth2.getAuthInstance();

    if (authInstance.isSignedIn.get()) {
      const { onLogoutSuccess, onLogoutFailure, onRequest } = this.props

      //Call onRequest function
      onRequest();

      authInstance.signOut()
        .then(
        () => {
          onLogoutSuccess()
        },
        () => {
          onLogoutFailure()
        }
        );
    }
  }

  render() {

    return renderDefaultButton({
      text:this.props.text,
      backgroundColor:this.props.backgroundColor,
      disabled:this.props.disabled,
      className:"react-google-oauth-button-logout",
      onClickFunc:this.signOut,
      with:this.props.width
    })
  }
}
GoogleLogout.contextTypes = {
  reactGoogleApi: PropTypes.bool
}

GoogleLogout.propTypes = {
  onLogoutSuccess: PropTypes.func,
  onLogoutFailure: PropTypes.func,
  onRequest: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  width: PropTypes.string
};

GoogleLogout.defaultProps = {
  onLogoutSuccess: f => f,
  onLogoutFailure: f => f,
  onRequest: f => f,
  text: 'Sign out',
};

export default GoogleLogout;