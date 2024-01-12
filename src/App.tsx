import React, { useState, useCallback, useEffect }  from 'react';
import './assets/css/App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import Modal from './components/Modal';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { User, Post, Category1, UserProps, PostProps } from './App.types';
import { userLogout, userSignedIn } from './components/Miscellaneous/apiRequests';
import Cookies from 'js-cookie';
import AddPost from './components/Post/AddPost';
import FullPost from './components/Post/FullPost';

export function RefreshPage() {
    window.location.reload();
}

const App = () => {
    const [user, setUser] = useState({ logged_in: false });
    const [errors, setErrors] = useState<string|string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

    const handleModal = useCallback((errors:string|string[] = []) => {
        setErrors(errors);
    }, [setErrors]);

    useEffect(() => {
        setShowModal(errors.length > 0);
      }, [errors]);

    const handleLogin = (user: UserProps) => {
        setUser(user);
        Cookies.set('token', user.token, { expires: 7, path: '/' })
    };

    const handleLogout = () => {
        userLogout()
          .then(response => {
            if ('errors' in response && !response.success) handleModal(response.errors);
            setUser({ logged_in: false });
          });
        Cookies.remove('token');
    };


    // Check if user is logged in
    useEffect(() => {
        userSignedIn()
        .then(response => {
            if ('user' in response && response.success) setUser(response.user);
            if ('errors' in response && !response.success) handleModal(response.errors);
            setLoading(false);
        });
    }, [handleModal]);
    return loading 
    ? <> </>
    : (
        <div>
        <Router>
            <Routes>
                {/* <Route index element={<SignIn handleModal={handleModal} handleLogin={handleLogin} />} /> */}
                <Route index element={<Home user={user} handleLogout={handleLogout} handleModal={handleModal} />} />
                <Route path='/MyPosts' element={<MyPosts user={user} handleModal={handleModal} handleLogout={handleLogout} />} />
                <Route path='/SignIn' element={<SignIn handleModal={handleModal} handleLogin={handleLogin} />} />
                <Route path='/SignUp' element={<SignUp handleModal={handleModal}/>} />
                <Route path="/users/:id" children element= {<Profile user={user} handleModal={handleModal} handleLogout={handleLogout}/>}/>
                <Route path='/:category' element= {<CategoryPage user={user} handleModal={handleModal} handleLogout={handleLogout} />} />
                    {/* <Route path='post/:postID' element= {<FullPost />} /> */}
                {/* </Route> */}
                <Route path='*' element={<NoPage statusCode={404} />} />
            </Routes>
        </Router>
        
        {showModal && <Modal errors={errors} handleModal={handleModal} />}
        </div>
    );
    
}
export default App;

















    // const curr_user = new User(1, 'admin', 'randomtoken', 1);
    // const next_user = new User(2, 'randomUser', 'randomtoken2', 0);
    // const users = [curr_user, next_user];
    
    
    // function randomInt(min: number, max: number) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // const generalCat = new Category1(0, 'GENERAL', new Date());
    // const categories = [generalCat, 
    //     ...[...new Array(2)].map((curr, idx) => new Category1(idx + 1, 'cat' + (idx + 1), new Date()))];
    // const myPinnedPosts = [...new Array(2)].map((curr, idx) => 
    //     new Post(idx, 
    //         'MY PINNED POST BODY' + idx,
    //         'MY POST NO.' + idx,
    //         randomInt(0, 2), true, 1, new Date()));
                
    // const myPosts = [...new Array(2)].map((curr, idx) => 
    //     new Post(idx, 
    //         'MY POST BODY' + (idx + 2),
    //         'MY POST NO.' + (idx + 2),
    //         randomInt(0, 2), true, 1, new Date()));  
    
    // const randomPinnedPosts = [...new Array(1)].map((curr, idx) => 
    //     new Post(idx, 
    //         'OTHER PINNED POST BODY' + (idx + 4),
    //         'OTHER POST NO.' + (idx + 4),
    //         randomInt(0, 2), true, 2, new Date()));
            
    // const randomPosts = [...new Array(5)].map((curr, idx) => 
    //     new Post(idx, 
    //         'OTHER POST BODY' + (idx + 5),
    //         'OTHER POST NO.' + (idx + 5),
    //         randomInt(0, 2), true, 2, new Date()));  
    // //
    // const pinnedPosts = [...randomPinnedPosts, ...myPinnedPosts];
    // const posts = [...randomPosts, ...myPosts];

// export {curr_user, next_user, users, generalCat, categories, myPinnedPosts, myPosts, pinnedPosts, randomPinnedPosts, randomPosts, posts};
