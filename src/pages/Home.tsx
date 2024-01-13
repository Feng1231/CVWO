import React, { FC, useCallback, useEffect, useState } from 'react';
import Header from '../components/Miscellaneous/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import PinnedPost from '../components/Post/PinnedPost';
import NonPinnedPost from '../components/Post/NonPinnedPost';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { User, Post, HomeProps, CategoryProps } from '../App.types';
import NoPage from './NoPage';
import { fetchAllCategories, fetchAllCategoryPosts } from '../components/Miscellaneous/apiRequests';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';


const Home: FC<HomeProps> = ({ user, handleLogout, handleModal }) => {
    const [searchPost, setSearchPost] = useState('');
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [categoryTopics, setCategoryTopics] = useState<CategoryProps[]>([]);
    
    const handleSearchPost = useCallback((search:string) => {
        setSearchPost(search);
        console.log(search);
    },[setSearchPost]);

    const populatePinnedPosts = () => pinnedPosts.map(post => (
          <PinnedPost user={user} post={post} handleModal={handleModal}/>
      ));

    const populateAllCategories = () => categoryTopics.map(categoryData => (
        <div key={categoryData.id}>
        {categoryData.posts.filter(post => (post.title.includes(searchPost) || searchPost==='') && !post.is_pinned).length > 0 &&
        <Divider />}
        {categoryData.posts.filter(post => (post.title.includes(searchPost) || searchPost==='') && !post.is_pinned).map(post => (
                
                <NonPinnedPost user={user} post={post} handleModal={handleModal}/>
            ))}
        {categoryData.posts.filter(post => !post.is_pinned).length > 0 && <Divider></Divider>}
        
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
        });
    }, [handleModal]);

/////////////////////////////////////////////////////////////////
    sessionStorage.setItem('cat', JSON.stringify({...categoryTopics}));
    /////////////////////////////////////////////////////////////////

    return !user.logged_in
    ? <NoPage statusCode={401} />
    : (<>
        <PrimarySearchAppBar user={user} categories={categoryTopics} handleLogout={handleLogout} handleModal={handleModal} handleSearchPost={handleSearchPost} />
        <Container maxWidth='xl'>
            <Header title='Home'/>
            <>{populatePinnedPosts()}</>
            <>{populateAllCategories()}</>
        </Container>
    </>)
}

export default Home;