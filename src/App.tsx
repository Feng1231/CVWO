import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
export function RefreshPage() {
    window.location.reload();
}
const App = () => {
    
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='Home' element={<Home />} />
                <Route path='Profile' element={<Profile />} />
                <Route path='SignIn' element={<SignIn />} />
                <Route path='SignUp' element={<SignUp />} />
                <Route path='*'element={<NoPage />} />
            </Routes>
        </Router>
    );
    
}
export default App;
