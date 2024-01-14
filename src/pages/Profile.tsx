import React, { FC } from 'react';
import Header from '../components/Miscellaneous/Header'
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePageAppBar from '../components/Profile/ProfilePageAppBar';
import ProfilePageBody from '../components/Profile/ProfilePageBody';
import '../assets/css/App.css';
import { ProfileProps } from '../App.types';
import { useParams } from 'react-router-dom';
import NoPage from './NoPage';

// user profile page display
const Profile: FC<ProfileProps> = ({ user, handleModal, handleLogout}) => {
    let { id } = useParams() ;
    const userID = 'id' in user ? user.id : -1;
    
    return id === "-1" || !user.logged_in || userID !== Number(id)
    ? <NoPage statusCode={401} />
    : (
        <>
            <CssBaseline />
            <Header title='Profile' />
            <ProfilePageAppBar user={user} handleLogout={handleLogout} />
            <ProfilePageBody user={user} handleModal={handleModal} handleLogout={handleLogout} />
        </>            
    )
    

}

export default Profile;