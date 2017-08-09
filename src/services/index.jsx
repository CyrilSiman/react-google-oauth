import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'

const insertGoogleScript = (document, parentTag, id, handleClientLoad) => {
      const element = document.getElementsByTagName(parentTag)[0];
      const fjs = element;
      let js = element;
      js = document.createElement(parentTag);
      js.id = id;
      js.src = '//apis.google.com/js/client:platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = handleClientLoad;
}

// Loads auth2 library
const  handleClientLoad = (initGoogleClient) => () =>
    window.gapi.load('auth2', initGoogleClient);
    
const initGoogleClientAPI = (params,onUpdateSigninStatus,onInitFailure) => () => {

    const auth2 =  window.gapi.auth2
    auth2.init(params).then(
        () => {
            // Listen for sign-in state changes.
            auth2.getAuthInstance().isSignedIn.listen(onUpdateSigninStatus);
            // Handle the initial sign-in state.
            onUpdateSigninStatus(auth2.getAuthInstance().isSignedIn.get());
        }, onInitFailure
    )
}

const makeGoogleParams = (props) => {
    const { clientId, cookiePolicy, loginHint, hostedDomain, fetchBasicProfile, redirectUri, discoveryDocs, uxMode } = props

    return ({
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri
    })
}

//The function called if the Google libraries failed to load.
const initGoogleClientAPIFailure =  err =>
    console.error(err)

class GoogleAPI extends Component {

    
    componentWillMount() {

        const {children} = this.props

        invariant(
            children == null || React.Children.count(children) === 1,
            'A <GoogleAPI> may have only one child element'
        )
    }


  componentDidMount() {

    const onUpdateSigninStatus = this.props.onUpdateSigninStatus ? this.props.onUpdateSigninStatus : f => f
    const onInitFailure = this.props.onFailure ? this.props.onInitFailure : initGoogleClientAPIFailure

    const params = makeGoogleParams(this.props)

    const initClient = initGoogleClientAPI(params,onUpdateSigninStatus,onInitFailure)
    const initGoogleApi = handleClientLoad(initClient)
    
    insertGoogleScript(document, 'script', 'google-login', initGoogleApi);
  }

  render() {
    const { children } = this.props
    return children ? React.Children.only(children) : null
  }
}

GoogleAPI.propTypes = {
  onUpdateSigninStatus: PropTypes.func,
  onInitFailure: PropTypes.func,
  clientId: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  scope: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  autoLoad: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  responseType: PropTypes.string,
  uxMode: PropTypes.string
};

GoogleAPI.defaultProps = {
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  uxMode: 'popup',
  onRequest: () => {},
};

export default GoogleAPI;