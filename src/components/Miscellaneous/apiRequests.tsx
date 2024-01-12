import axios from 'axios';
import { UserSignInProps ,UserSignUpProps, UserProps, CategoryNewProps, CategoryEditProps, PostNewProps, PostEditProps, CommentNewProps, CommentEditProps, CommentProps} from '../../App.types';
const URL = 'http://127.0.0.1:3000/';

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
const errorCatch = (error: { response: { data: { errors: string; }; statusCode: number; }; }) => {
    if (!error.response) { return { errors: `${error}`, success: false }; }
    const errorMsg = error.response.data.errors || [`${error.response.statusCode}`];

    return { errors: organizeErrors(errorMsg), success: false };
};
// User SignIn
const userSignIn = async (user: UserSignInProps) => {
    sessionStorage.clear();
    return axios.post(`${URL}log_in`, { user })
        .then(response => {
            const retrievedUser: UserProps = response.data.user;
            sessionStorage.setItem('user', JSON.stringify({ ...retrievedUser }));

            return { user: retrievedUser, success: true };
        })
        .catch(error => errorCatch(error));
};

// User Logout
const userLogout = async () => {
    let login;
    if (sessionStorage.getItem('user')) login = await JSON.parse(sessionStorage.getItem('user')!);
    sessionStorage.clear();
    return axios.patch(`${URL}logout`, null, { headers: { Authorization: login.token } })
    .then(() => ({ success: true }))
    .catch(error => errorCatch(error));
};

const userSignUp = async (user: UserSignUpProps) => {
    sessionStorage.clear();
    return axios.post(`${URL}sign_up`, { user })
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
        return await axios.get(`${URL}logged_in`, { headers: { Authorization: user.token } })
            .then(response => {
                const retrievedUser = response.data.user;
        
                return { user: retrievedUser, success: true };
            })
            .catch(error => errorCatch(error));
    }   
    return { user: { logged_in: false }, success: true };
};

// check cookie matches any user's token
const checkCookies = async (cookie:string) => axios.get(`${URL}retrieve`, { headers: { Authorization: cookie }})
  .then (response => {
    const retrievedUser = response.data.user;
    
    return { user: retrievedUser, success: true };
  })
  .catch(error => errorCatch(error));

// fetch user data
const fetchUser = async (id: number) => axios.get(`${URL}users/${id}`)
  .then(response => {
    const retrievedUser = response.data.user;
    return { user: retrievedUser, success: true };
  })
  .catch(error => errorCatch(error));
  


// create category
const categoryNew = async (category:CategoryNewProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.post(`${URL}category`, { category }, { headers: { Authorization: login.token } })
      .then(response => {
        const { category } = response.data;
  
        return { category, success: true };
      })
      .catch(error => errorCatch(error));
  };

// rename category
const categoryEdit = async (category:CategoryEditProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.patch(`${URL}category/${category.id}`, { category }, { headers: { Authorization: login.token } })
        .then(response => {
            const { categories } = response.data;

            return { categories, success: true };
        })
        .catch(error => errorCatch(error));
};

// Delete category
const categoryRemove = async (categoryID: number) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.delete(`${URL}category/${categoryID}`, { headers: { Authorization: login.token } })
        .then(response => {

        return { success: true };
        })
        .catch(error => errorCatch(error));
};

// Fetch all categories
const fetchAllCategories = async () => axios.get(`${URL}category/all`)
  .then(response => {
    const { categories } = response.data.results;

    return { categories, success: true };
  })
  .catch(error => errorCatch(error));

//Fetch all categories and posts
const fetchAllCategoryPosts = async () => axios.get(`${URL}category`)
  .then(response => {  
    
    const { categories, pinned_posts } = response.data.results;

    return {
      categories, pinned_posts, success: true,
    };
  })
  .catch(error => errorCatch(error));

// Fetch Specific Category and Posts
const fetchCategoryPosts = async (category: string) => axios.get(`${URL}category/${category}`)
  .then(response => {
    const { category } = response.data.results;
    return {
      category, success: true,
    };
  })
  .catch(error => errorCatch(error));
// Create New Post
const postNew = async (post: PostNewProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.post(`${URL}post`, post,
        { headers: { 'Content-Type': 'application/json', Authorization: login.token } })
        .then(response => {
            const { post } = response.data;
            return { post, success: true };
        })
        .catch(error => errorCatch(error));
};

  // Edit a post
const postEdit = async ({postID, post}: PostEditProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.patch(`${URL}post/${postID}`, post,
        { headers: { 'Content-Type': 'application/json', Authorization: login.token } })
        .then(response => {
            const { post } = response.data;
    
            return { post, success: true };
        })
        .catch(error => errorCatch(error));
};

// Pin a post
const postHandlePin = async (postID: number) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.patch(`${URL}post/${postID}/pin_post`, null, { headers: { Authorization: login.token } })
        .then(response => {
            const { post } = response.data;
    
            return { post, success: true };
        })
        .catch(error => errorCatch(error));
};

// Remove a Post
const postRemove = async (postID: number) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.delete(`${URL}post/${postID}`, { headers: { Authorization: login.token } })
        .then(response => {
            const { message } = response.data;
    
            return { message, success: true };
        })
        .catch(error => errorCatch(error));
};

// Fetch post by ID
const fetchPost = async (id: number) => axios.get(`${URL}post/${id}`)
    .then(response => {
        const { post, comments } = response.data;

        return { post, comments, success: true };
    })
    .catch(error => errorCatch(error));

// Create New Comment
const commentNew = async (comment: CommentNewProps ) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.post(`${URL}comment`, { comment },
        { headers: { Authorization: login.token } })
        .then(response => {
        const { comment, comments } = response.data;

        return { comment, comments, success: true };
        })
        .catch(error => errorCatch(error));
};

// Edit a Comment
const commentEdit = async (comment: CommentEditProps ) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios.patch(`${URL}comment/${comment.id}`, { comment }, { headers: { Authorization: login.token } })
        .then(response => {
        const { comment, comments } = response.data;

        return { comment, comments, success: true };
        })
        .catch(error => errorCatch(error));
};

// Remove a Comment
const commentRemove = async (comment: CommentProps) => {
    let login;
    if (sessionStorage.getItem('user')) login = JSON.parse(sessionStorage.getItem('user')!);
    return axios(
        {
        method: 'delete',
        url: `${URL}comments/${comment.id}`,
        headers: { Authorization: login.token },
        data: comment,
        },
    )
        .then(response => {
        const { message, comments } = response.data;

        return { message, comments, success: true };
        })
        .catch(error => errorCatch(error));
};
export { userSignIn, userLogout, userSignUp, userSignedIn, fetchUser,
         categoryNew, categoryEdit, categoryRemove, fetchAllCategories, fetchAllCategoryPosts, fetchCategoryPosts,
         postNew, postEdit, postRemove, postHandlePin, fetchPost, 
         commentNew, commentEdit, commentRemove, checkCookies};