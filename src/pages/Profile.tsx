import React from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfilePageAppBar from '../components/ProfilePageAppBar';
import ProfilePageBody from '../components/ProfilePageBody';
import '../App.css';
const Profile = () => {
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            <Header title='Profile' />
            <ProfilePageAppBar />

            <ProfilePageBody />
            

                    
        </ThemeProvider>
    );
}

export default Profile;