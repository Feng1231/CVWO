import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Miscellaneous/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import PinnedPost from '../components/Post/PinnedPost';
import NonPinnedPost from '../components/Post/NonPinnedPost';
import { Button, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { User, Post, MyPostsProps, CategoryProps, PostProps } from '../App.types';
import NoPage from './NoPage';
import { fetchAllCategoryPosts } from '../components/Miscellaneous/apiRequests';

const MyPosts: FC<MyPostsProps> = ({ user, handleModal, handleLogout, }) => {
    const userID = 'id' in user ? user.id : -1;
    const [pinnedPosts, setPinnedPosts] = useState<PostProps[]>([]);
    const [categoryTopics, setCategoryTopics] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const populatePinnedPosts = () => pinnedPosts.filter(post => post.user_id === userID).map(post => (
          <PinnedPost user={user} post={post} handleModal={handleModal}/>
    ));

    const populateAllCategories = () => categoryTopics.map(categoryData => (
        <div key={categoryData.id}>
        <Divider><Chip label={ categoryData.name } size='medium'/></Divider>
        {categoryData.posts.filter(post => !post.is_pinned && post.user_id === userID).map(post => (
                <NonPinnedPost user={user} post={post} handleModal={handleModal} />
            ))}
        </div>
    ));

    useEffect(() => {
        fetchAllCategoryPosts()
        .then(response => {
            if ('categories' in response && response.success) {
                setCategoryTopics(response.categories);
            }
            if ('pinned_posts' in response && response.success) {
                setPinnedPosts(response.pinned_posts);
            }
            if ('errors' in response && !response.success) handleModal(response.errors);
        })
        setLoading(false);
    }, [handleModal]);
    
    return loading ? <></> :user.logged_in
    ? (<>
        <CssBaseline />
        <PrimarySearchAppBar user={user} categories={categoryTopics} handleLogout={handleLogout} handleModal={handleModal} />
        <Container maxWidth='xl'>
            <Header title='MyPosts' />
            <>{populatePinnedPosts()}</>
            <>{populateAllCategories()}</>
        </Container>
    </>)
    : <NoPage statusCode={401} />;

}

export default MyPosts;
