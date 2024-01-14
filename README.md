# REACT-Discum
[![Netlify Status](https://api.netlify.com/api/v1/badges/6bb8a5ae-bb99-443f-8f10-3e51c8e23457/deploy-status)](https://app.netlify.com/sites/discum-forum/deploys)

Front-end system built with React.js for a Forum. Users will be able to create new posts, edit posts, remove posts through a content management system linked to a [Ruby on Rails PostgreSQL database Back-end](https://github.com/Feng1231/CVWO-backend)

## Features
### Category (admin only)
- Create Category
- Edit Category
- Remove Category

### Post
- Create posts
- Edit posts
- Remove posts
- Pin posts (admin only)
- Search for posts

### Comment
- Create comment
- Edit comment
- Remove comment
- Reply to other main comments under a post

### Authentication System
- Create User Accounts
- Able to log into a specified User Account with username and password
- Edit User Password
- Delete User Account

## [LIVE DEMO](https://discum-forum.netlify.app/)

## Built With

- HTML, CSS
- TypeScript
- React.js
- React-Router
- Axios
- NPM Webpack

### Set up this project
Start by downloading the zip file of this project into your computer

### Install Depencies

```
$ npm install
```

### Run Application

* ensure URL in /src/components/Miscellaneous/apiRequests.tsx is correctly configured to be your backend database base URL.

```
`npm start`
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```
npm run build`
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Author

- Github: [@Feng1231](https://github.com/Feng1231)
- Linkedin: [Chen Feng](https://www.linkedin.com/in/feng-chen-356221289/)
