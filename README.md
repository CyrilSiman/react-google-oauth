**DEV and documentation in progress**

# react-google-oauth

*Directly inspired from [react-google-login](https://github.com/anthonyjgrove/react-google-login) project.*

With react-google-oauth you can quickly and easly add Login and Logout Google button.

![Google button with hover state](https://i.imgur.com/PDgUgJW.gif)

# How it works

This module is composed by two kind of components :

- \<GoogleAPI> used to inject and initialize the Google Api with your Google client ID, follow this <a href="https://developers.google.com/identity/sign-in/web/devconsole-project" >Google's documentation to get yours</a>
- \<GoogleLogin> \<GoogleLogout> \<CustomGoogleLogin> \<CustomGoogleLogout> components used to display buttons and connect each *clickEvents* to Google Oauth Api.

# Install

```bash
npm install react-google-oauth
```

# How use it

**1°) Inject and init Google API script**

Add \<GoogleAPI> component in your tree

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleAPI} from 'react-google-oauth'

ReactDOM.render(
        <GoogleAPI clientId="YOUR CLIENT ID"
            onUpdateSigninStatus={Function}
            onInitFailure={Function} >
         	<YourApp />
        </GoogleAPI>, document.getElementById('root'));
```

By default the Google API is initialize to make a simple Oauth with profile...

**Attention** : As other React component \<GoogleAPI> can have only one child

scope: 'profile email',

responseType: 'permission',

prompt: '',

cookiePolicy: 'single_host_origin',

fetchBasicProfile: true,

uxMode: 'popup',



**2°) Add a button**

Add a button component under GoogleAPI *(each button component check if it is a child of GoogleAPI, if not an error message is displayed)*

```Jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleAPI,GoogleLogin,GoogleLogout} from 'react-google-oauth'

ReactDOM.render(
        <GoogleAPI clientId="YOUR CLIENT ID"
            onUpdateSigninStatus={CALLBACK}
            onInitFailure={CALLBACK} >
			<div>
              	<div><GoogleLogin /></div>
              	<div><GoogleLogout /></div>
    		</div>
        </GoogleAPI>, document.getElementById('root'));
```

onLoginSuccess: function called when the authentification is done. Often it's more preferable to use onUpdateSigninStatus from \<GoogleAPI>

onLoginFailure: function called when a error occured. By example when a user closed the Google's popup before choice an account. This function take an object containing an error property. See <a href="https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions" >Error Code</a> on Google's documentation for more details.

onRequest : called just before the call to Google Api Script, you can used this callback to display a loader by example. None parameter is send.



# Rendering

## \<GoogleLogin> & \<GoogleLogout>

Without parameters, buttons look like this :

```
<GoogleLogin />
<GoogleLogout />
```

![GoogleLogin button](https://i.imgur.com/LvEQ6yz.png) ![GoogleLogout button](https://i.imgur.com/SiR83vT.png)

## Text, Color, Width

With pre-define rendering you can only change the text, the  width and the background color.

*Sample*

```jsx
<GoogleLogin 
  	backgroundColor="#A31515" 
  	text="login"
  	width="180px"
  	/>
```

![Red GoogleLogin button](https://i.imgur.com/3LD3FTF.png)

*Hover and active state are automaticaly generate (opacity 50% for Hover state and filter:brightness(80%) for active state.)*

**Login button**

| Parameter       | Default value       |
| --------------- | ------------------- |
| text            | Sign in with Google |
| width           | 240px               |
| backgroundColor | \#4285f4            |

**Logout button**

| Parameter       | Default value |
| --------------- | ------------- |
| text            | Sign out      |
| width           | 180px         |
| backgroundColor | \#A31515      |

