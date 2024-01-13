import React, { FC, useCallback, useEffect, useState } from 'react';
import Header from '../Miscellaneous/Header';
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePageAppBar from '../ProfilePageAppBar';
import ProfilePageBody from '../ProfilePageBody';
import '../../assets/css/App.css';
import { useParams } from 'react-router-dom';
import NoPage from '../../pages/NoPage';
import { AdminPanelProps, CategoryOnlyProps } from '../../App.types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonGroup, CardActionArea, CardActions, Container } from '@mui/material';
import { fetchAllCategories, fetchAllCategoryPosts } from '../Miscellaneous/apiRequests';
import AddCategory from './AddCategory';
import RenameCategory from './RenameCategory';
import DeleteCategory from './DeleteCategory';


const AdminPanel: FC<AdminPanelProps> = ({ user, handleModal, handleLogout }) => {
    const admin_level = 'admin_level' in user ? user.admin_level : -1;
    const [categories, setCategories] = useState<CategoryOnlyProps[]>([]);

    const handleSetCategories = useCallback((categories:CategoryOnlyProps[]) => {
        setCategories(categories);
    }, [setCategories])

    useEffect(() => {
        fetchAllCategoryPosts()
            .then(response => {
                if ('categories' in response && response.success) handleSetCategories(response.categories);
                if ('errors' in response && !response.success) handleModal(response.errors);
            }
        )
    }, [handleSetCategories, handleModal]);

    return admin_level !== 1 || !user.logged_in
    ? <NoPage statusCode={401} />
    : (
        <>
            <CssBaseline />
            <Header title='Admin' />
            <ProfilePageAppBar user={user} handleLogout={handleLogout} />
            <Container sx={{width:'100vh', height:'80vh'}}>
                <Card sx={{display:'flex',mt:3, justifyContent: 'center', alignItems: 'center', minWidth:1, minHeight:1}}>
                    <CardActions >
                        <div>
                            <AddCategory user={user} handleModal={handleModal}/>
                            <RenameCategory user={user} categories={categories} handleModal={handleModal}/>
                            <DeleteCategory user={user} categories={categories} handleModal={handleModal}/>
                        </div>
                    </CardActions>
                </Card>
            </Container>
        </>            
    )
    

}

export default AdminPanel;



