import { FC, useEffect, useState, useCallback } from 'react';
import Header from '../components/Miscellaneous/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/Forum/PrimarySearchAppBar';
import PinnedPost from '../components/Post/PinnedPost';
import NonPinnedPost from '../components/Post/NonPinnedPost';
import { Divider } from '@mui/material';
import { MyPostsProps, CategoryProps, PostProps } from '../App.types';
import NoPage from './NoPage';
import { fetchAllCategoryPosts } from '../components/Miscellaneous/apiRequests';

// display the posts created by user
const MyPosts: FC<MyPostsProps> = ({ user, handleModal, handleLogout, }) => {
    const [searchPost, setSearchPost] = useState('');
    const userID = 'id' in user ? user.id : -1;
    const [pinnedPosts, setPinnedPosts] = useState<PostProps[]>([]);
    const [categoryTopics, setCategoryTopics] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSearchPost = useCallback((search:string) => {
        setSearchPost(search);
    },[setSearchPost]);

    const populatePinnedPosts = () => pinnedPosts.filter(post => post.user_id === userID).map(post => (
          <PinnedPost user={user} post={post} handleModal={handleModal}/>
    ));

    const populateAllCategories = () => categoryTopics.map(categoryData => (
        <div key={categoryData.id}>
        <Divider></Divider>
        {categoryData.posts.filter(post => (post.title.includes(searchPost) || searchPost==='') && !post.is_pinned && post.user_id === userID).map(post => (
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
        <PrimarySearchAppBar user={user} categories={categoryTopics} handleLogout={handleLogout} handleModal={handleModal} handleSearchPost={handleSearchPost} />
        <Container maxWidth='xl'>
            <Header title='MyPosts' />
            <>{populatePinnedPosts()}</>
            <>{populateAllCategories()}</>
        </Container>
    </>)
    : <NoPage statusCode={401} />;

}

export default MyPosts;
