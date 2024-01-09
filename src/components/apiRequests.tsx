import axios from 'axios';
import { SignInProps ,SignUpProps, UserProps } from '../App.types';
const URL = 'https://arn-forum-api.herokuapp.com/';

const organizeErrors = (errors: string | string[]) => {
    const errorMsg = !Array.isArray(errors) ? errors.split(':') : errors[0];
    let errorList = errors;
    if (Array.isArray(errorMsg)) {
      if (errorMsg.length > 1) errorMsg.shift();
      errorList = errorMsg.join().trim().split(',');
    }
  
    return errorList;
};
  
// Handles the error catching of an API request
const errorCatch = (error: { response: { data: { errors: string[]; }; statusText: string; }; }) => {
    if (!error.response) { return { errors: `${error}`, success: false }; }
    const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

    return { errors: organizeErrors(errorMsg), success: false };
};

// User SignIn
const userSignIn = async (user: SignInProps) => {
    sessionStorage.clear();
    return axios.post(`${URL}SignIn`, { user })
        .then(response => {
            const retrievedUser = response.data.user;
            sessionStorage.setItem('user', JSON.stringify({ ...retrievedUser }));

            return { user: retrievedUser, success: true };
        })
    .catch(error => errorCatch(error));
};

// User Logout
const userLogout = async () => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    sessionStorage.clear();
    return axios.patch(`${URL}logout`, null, { headers: { Authorization: login.token } })
    .then(() => ({ success: true }))
    .catch(error => errorCatch(error));
};

const userSignUp = async (user: SignUpProps) => {
    sessionStorage.clear();
    return axios.post(`${URL}SignUp`, { user })
        .then(response => {
            const { message } = response.data;

            return { message, success: true };
        })
        .catch(error => errorCatch(error));
};

// Is User Still Signed In?
const userSignedIn = async () => {
    if (sessionStorage.getItem('user')) {
        const user = JSON.parse(sessionStorage.getItem('user')!);
        return axios.get(`${URL}logged_in`, { headers: { Authorization: user.token } })
            .then(response => {
                const retrievedUser = response.data.user;
        
                return { user: retrievedUser, success: true };
            })
            .catch(error => errorCatch(error));
    }
    return { user: { logged_in: false }, success: true };
};

// Set admin rights
const userToAdmin = async (user: UserProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.patch(`${URL}users/${user.id}/set_admin_level`, { user }, { headers: { Authorization: login.token } })
        .then(response => {
            const { user } = response.data;

            return { user, success: true };
        })
        .catch(error => errorCatch(error));
};
  
export { userSignIn, userLogout, userSignUp, userSignedIn, userToAdmin };

