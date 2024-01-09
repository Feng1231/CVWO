import React from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePageAppBar from '../components/ProfilePageAppBar';
import ProfilePageBody from '../components/ProfilePageBody';
import '../assets/css/App.css';

const Profile = () => {
    return (
        <>
            <CssBaseline />
            <Header title='Profile' />
            <ProfilePageAppBar />
            <ProfilePageBody />
        </>            
    );
}

export default Profile;