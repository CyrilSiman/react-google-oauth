**DEV and documentation in progress**

# react-google-oauth

*Directly inspired from [react-google-login](https://github.com/anthonyjgrove/react-google-login) project.*

With react-google-oauth you can quickly and easly add Login and Logout Google button.

![Default Login button](https://i.imgur.com/9TYFPZf.png)

# How it works

This module is composed by two kind of components :

- \<GoogleApi> used to inject and initialize the Google Api with your Google Api Key
- \<GoogleLogin> \<GoogleLogout> \<CustomGoogleLogin> \<CustomGoogleLogout> components used to display buttons and connect each *clickEvents* to Google Oauth Api.

# Install

```bash
npm install react-google-oauth
```

# How use it



# Rendering

## \<GoogleLogin> & \<GoogleLogout>

Without parameters, buttons look like this :

```
<GoogleLogin />
<GoogleLogout />
```

![](https://i.imgur.com/LvEQ6yz.png) ![](https://i.imgur.com/SiR83vT.png)

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

![](https://i.imgur.com/3LD3FTF.png)

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

