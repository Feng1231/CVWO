import React, { FC } from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePageAppBar from '../components/ProfilePageAppBar';
import ProfilePageBody from '../components/ProfilePageBody';
import '../assets/css/App.css';
import { ProfileProps } from '../App.types';
import { useParams } from 'react-router-dom';
import NoPage from './NoPage';

const Profile: FC<ProfileProps> = ({ user, handleModal}) => {
    let { id } = useParams() ;
    const userID = 'id' in user ? user.id : -1;
    return id === "-1" || !user.logged_in || userID !== Number(id)
    ? <NoPage statusCode={401} />
    : (
        <>
            <CssBaseline />
            <Header title='Profile' />
            <ProfilePageAppBar user={user}/>
            <ProfilePageBody />
        </>            
    )
    

}

export default Profile;