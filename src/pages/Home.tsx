import { FC, useCallback, useEffect, useState } from 'react';
import Header from '../components/Miscellaneous/Header'
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/Forum/PrimarySearchAppBar';
import PinnedPost from '../components/Post/PinnedPost';
import NonPinnedPost from '../components/Post/NonPinnedPost';
import { Divider } from '@mui/material';
import { HomeProps, CategoryProps } from '../App.types';
import NoPage from './NoPage';
import { fetchAllCategoryPosts } from '../components/Miscellaneous/apiRequests';

// display for home page after log in
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