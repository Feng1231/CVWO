import React from 'react';
import './assets/css/App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { User, Post, Category } from './App.types';
export function RefreshPage() {
    window.location.reload();
}

const curr_user = new User(1, 'admin', 'randomtoken', 1);
const next_user = new User(2, 'randomUser', 'randomtoken2', 0);
const users = [curr_user, next_user];

function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generalCat = new Category(0, 'GENERAL', new Date());
const categories = [generalCat, 
    ...[...new Array(2)].map((curr, idx) => new Category(idx + 1, 'cat' + (idx + 1), new Date()))];
const myPinnedPosts = [...new Array(2)].map((curr, idx) => 
    new Post(idx, 
        'MY PINNED POST BODY' + idx,
        'MY POST NO.' + idx,
        randomInt(0, 2), true, 1, new Date()));
            
const myPosts = [...new Array(2)].map((curr, idx) => 
    new Post(idx, 
        'MY POST BODY' + (idx + 2),
        'MY POST NO.' + (idx + 2),
        randomInt(0, 2), true, 1, new Date()));  

const randomPinnedPosts = [...new Array(1)].map((curr, idx) => 
    new Post(idx, 
        'OTHER PINNED POST BODY' + (idx + 4),
        'OTHER POST NO.' + (idx + 4),
        randomInt(0, 2), true, 2, new Date()));
        
const randomPosts = [...new Array(5)].map((curr, idx) => 
    new Post(idx, 
        'OTHER POST BODY' + (idx + 5),
        'OTHER POST NO.' + (idx + 5),
        randomInt(0, 2), true, 2, new Date()));  
//
const pinnedPosts = [...randomPinnedPosts, ...myPinnedPosts];
const posts = [...randomPosts, ...myPosts];

const App = () => {

    return (
        <Router>
            <Routes>
                <Route index element={<Home category={generalCat} />} />
                <Route path='Home' element={<Home category={generalCat}/>} />
                <Route path='MyPosts' element={<MyPosts />} />
                <Route path='Profile' element={<Profile />} />
                <Route path='SignIn' element={<SignIn />} />
                <Route path='SignUp' element={<SignUp />} />
                <Route path='*'element={<NoPage />} />
            </Routes>
        </Router>
    );
    
}
export default App;
export {curr_user, next_user, users, generalCat, categories, myPinnedPosts, myPosts, pinnedPosts, randomPinnedPosts, randomPosts, posts};
