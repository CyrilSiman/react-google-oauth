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
import {GoogleAPI} from 'react-google-oauth'

ReactDOM.render(
        <GoogleAPI clientId="YOUR CLIENT ID"
            onUpdateSigninStatus={CALLBACK}
            onInitFailure={CALLBACK} >
         	<YourApp />
        </GoogleAPI>, document.getElementById('root'));
```

Is this sample \<GoogleAPI> is used as Root node but maybe used where you which.

**Attention** : As other React component \<GoogleAPI> can have only one child

**2°) Add a button**

Add a button component under GoogleAPI *(each button component check if it is a child of GoogleAPI, if not an error message is displayed)*



scope: 'profile email',

responseType: 'permission',

prompt: '',

cookiePolicy: 'single_host_origin',

fetchBasicProfile: true,

uxMode: 'popup',

onRequest: f => f

# 



onLoginSuccess={responseGoogle}

​                onLoginFailure=

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

