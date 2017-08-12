**DEV and documentation in progress**

# react-google-oauth

*Directly inspired from [react-google-login](https://github.com/anthonyjgrove/react-google-login) project.*

With react-google-oauth you can quickly and easly add Login and Logout Google button.

![Default Login button](https://i.imgur.com/9TYFPZf.png)

# Install

```bash
npm install react-google-oauth
```



# Rendering

Without any parametres

```
<GoogleLogin />
<GoogleLogout />
```

![Default Login button](https://i.imgur.com/9TYFPZf.png) ![](https://i.imgur.com/6Sb0kUy.png)

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

| Parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      | Default value       |
| --------------- | ------------------- |
| text            | Sign in with Google |
| width           | 240px               |
| backgroundColor | \#4285f4            |

**Logout button**



| Parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       | Default value |
| --------------- | ------------- |
| text            | Sign out      |
| width           | 180px         |
| backgroundColor | \#A31515      |

