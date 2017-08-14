import _GoogleAPI from './services/index.jsx'
import _GoogleLogin from './components/login/'
import _GoogleLogout from './components/logout/'
import _CustomGoogleLogin from './components/customLogin/'
import _CustomGoogleLogout from './components/customLogout/'

export const GoogleAPI = _GoogleAPI
export const GoogleLogin = _GoogleLogin
export const GoogleLogout = _GoogleLogout
export const CustomGoogleLogin = _CustomGoogleLogin
export const CustomGoogleLogout = _CustomGoogleLogout

export const googleGetAuthResponse =  () => {
    let returnObj =  {}

    //Lib loaded
    if (window.gapi && window.gapi.auth2) {
        //Lib correctly init
        let authInstance = window.gapi.auth2.getAuthInstance()
        //User authenticated
        if (authInstance && authInstance.currentUser.get().getBasicProfile()) {
            let authResponse = authInstance.currentUser.get().getAuthResponse(true)

            if(authResponse) {

                returnObj =  {
                    accessToken : authResponse.access_token,
                    id_token : authResponse.id_token,
                    scope : authResponse.scope,
                    expiresIn : authResponse.expires_in,
                    firstIssuedAt : authResponse.first_issued_at,
                    expiresAt : authResponse.expires_at
                }   
            }
        }
    } 
    return returnObj
}

export const googleGetBasicProfil = () => {
    let returnObj =  {}
    //Lib loaded
    if (window.gapi && window.gapi.auth2) {
        //Lib correctly init
        let authInstance = window.gapi.auth2.getAuthInstance()
        //User authenticated
        if (authInstance && authInstance.currentUser.get().getBasicProfile()) {
            let basicProfile = authInstance.currentUser.get().getBasicProfile()

            returnObj =  {
                id : basicProfile.getId(),
                name : basicProfile.getName(),
                givenName :basicProfile.getGivenName(),
                familyName : basicProfile.getFamilyName(),
                imageUrl : basicProfile.getImageUrl(),
                email : basicProfile.getEmail(),
                hostedDomain : authInstance.currentUser.get().getHostedDomain(),
                scopes : authInstance.currentUser.get().getGrantedScopes()
            }   
        }
    } 
    return returnObj
}
