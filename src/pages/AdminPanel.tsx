import { FC, useCallback, useEffect, useState } from 'react';
import Header from '../components/Miscellaneous/Header';
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePageAppBar from '../components/Profile/ProfilePageAppBar';
import '../assets/css/App.css';
import NoPage from './NoPage';
import { AdminPanelProps, CategoryOnlyProps } from '../App.types';
import Card from '@mui/material/Card';
import { CardActions, Container } from '@mui/material';
import { fetchAllCategoryPosts } from '../components/Miscellaneous/apiRequests';
import AddCategory from '../components/Category_AdminOnly/AddCategory';
import RenameCategory from '../components/Category_AdminOnly/RenameCategory';
import DeleteCategory from '../components/Category_AdminOnly/DeleteCategory';

// admin page display
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



