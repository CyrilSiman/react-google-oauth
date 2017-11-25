import {Component} from 'react'
import PropTypes from 'prop-types';
import invariant from 'invariant'
import { renderCustomDefaultButton } from '../'

class CustomGoogleLogout extends Component {
  constructor(props, context) {
    super(props, context);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    invariant(
      this.context.reactGoogleApi,
      'A <CustomGoogleLogout> must be used only as child or descendant of <GoogleApi> '
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
    return renderCustomDefaultButton({
      tag: this.props.tag,
      className: this.props.className,
      text: this.props.text,
      disabled: this.props.disabled,
      children: this.props.children,
      onClickFunc: this.signOut
    })
  }
}

CustomGoogleLogout.contextTypes = {
  reactGoogleApi: PropTypes.bool
}

CustomGoogleLogout.propTypes = {
  onLogoutSuccess: PropTypes.func,
  onLogoutFailure: PropTypes.func,
  onRequest: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  width: PropTypes.string
};

CustomGoogleLogout.defaultProps = {
  onLogoutSuccess: f => f,
  onLogoutFailure: f => f,
  onRequest: f => f,
  text: 'Sign out',
  tag: "a",
};

export default CustomGoogleLogout;