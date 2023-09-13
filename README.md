# Project: Cat Breed Application Client

## Warre Welvaert - Group 50 

## Project Setup

In `/src/config.js` replace the `API_URL` with the address the server is running on + `/api/`

```javascript
const API_URL = 'http://IP_GOES_HERE/api/';
```

### Setup and run client
```sh
cd client
npm install
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## What is this?

This is the client side of my project for Web Frameworks and should be used alongside the Laravel server.

By communicating with the server this client is able to show a selection of cat breeds on the front page. They can also be filtered by name by using the input field on the front page. 

The site should be fully localized in both English and Dutch and the user can change the language at any time by using the dropdown menu at the top right of the screen.

A user can register a login, after doing this the user can access the admin page. Here cat breeds can be added updated or deleted. On the update and delete page a list of cats is shown in both languages. If a user manages to access the admin pages while not logged in they will not be able to add, update or delete any cat breeds. The users are also able to logout on the account page.

The client also does some input validation before passing data to the body for a POST or UPDATE. The request is then validated again on the server side. 

The `vue-i18n` package was used to handle localization.
