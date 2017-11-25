import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant'

const insertGoogleScript = (documentRoot, id, handleClientLoad) => {
    //Check if script already present
    if (!documentRoot.getElementById(id)) {
        const firstScriptTag = documentRoot.getElementsByTagName('script')[0];
        const scriptTag = documentRoot.createElement('script');
        scriptTag.async = 'async'
        scriptTag.defer = 'defer'
        scriptTag.id = id;
        scriptTag.src = '//apis.google.com/js/client:platform.js';
        scriptTag.onload = handleClientLoad;
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    }
}

// Loads auth2 library
const handleClientLoad = (initGoogleClient) => () =>
    window.gapi.load('auth2', initGoogleClient);

const initGoogleClientAPI = (params, onUpdateSigninStatus, onInitFailure) => () => {

    const auth2 = window.gapi.auth2
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
    const { clientId, cookiePolicy, hostedDomain, fetchBasicProfile, redirectUri, uxMode, scope } = props

    return ({
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope
    })
}

//The function called if the Google libraries failed to load.
const initGoogleClientAPIFailure = err =>
    console.error(err)

class GoogleAPI extends Component {

    getChildContext() {
        return {
            reactGoogleApi: true
        }
    }

    componentWillMount() {

        const { children } = this.props

        invariant(
            children == null || React.Children.count(children) === 1,
            'A <GoogleAPI> may have only one child element'
        )
    }

    componentDidMount() {

        const onUpdateSigninStatus = this.props.onUpdateSigninStatus ? this.props.onUpdateSigninStatus : f => f
        const onInitFailure = this.props.onFailure ? this.props.onInitFailure : initGoogleClientAPIFailure

        const params = makeGoogleParams(this.props)

        const initClient = initGoogleClientAPI(params, onUpdateSigninStatus, onInitFailure)
        const initGoogleApi = handleClientLoad(initClient)

        insertGoogleScript(document, 'react-google-oauth-id', initGoogleApi);
    }

    render() {
        const { children } = this.props
        return children ? React.Children.only(children) : null
    }
}

GoogleAPI.childContextTypes = {
    reactGoogleApi: PropTypes.bool
}

GoogleAPI.propTypes = {
    onUpdateSigninStatus: PropTypes.func,
    onInitFailure: PropTypes.func,
    clientId: PropTypes.string.isRequired,
    scope: PropTypes.string,
    cookiePolicy: PropTypes.string,
    fetchBasicProfile: PropTypes.bool,
    prompt: PropTypes.string,
    uxMode: PropTypes.string,
    hostedDomain: PropTypes.string,
    redirectUri: PropTypes.string,
    children: PropTypes.node,
};

GoogleAPI.defaultProps = {
    scope: '',
    cookiePolicy: 'single_host_origin',
    fetchBasicProfile: true,
    prompt: '',
    uxMode: 'popup',
};

export default GoogleAPI;