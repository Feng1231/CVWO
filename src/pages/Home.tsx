import React from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import PinnedPost from '../components/PinnedPost';
import NonPinnedPost from '../components/NonPinnedPost';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { User, Post, CategoryProps } from '../App.types';
import { pinnedPosts, posts } from '../App';


const Home = (categoryProps: CategoryProps) => {
    const { category }= categoryProps;
    return (
        <>
            <CssBaseline />
            <PrimarySearchAppBar />
            <Container maxWidth='xl'>
                <Header title='Home'/>
                {pinnedPosts.length > 0 && pinnedPosts
                    .filter(ele => ele.category_id === category.category_id)
                    .map((curr) => 
                    <PinnedPost post= {{
                        post_id: curr.post_id,
                        body: curr.body,
                        title: curr.title,
                        category_id: curr.category_id,
                        is_pinned: curr.is_pinned,
                        author_id: curr.author_id,
                        created_at: curr.created_at
                    }}/>
                )}
                <Divider><Chip label={ category.name } size='medium'/></Divider>
                {posts
                    .filter(ele => ele.category_id === category.category_id)
                    .map((curr) => 
                    <NonPinnedPost post = {{
                        post_id: curr.post_id,
                        body: curr.body,
                        title: curr.title,
                        category_id: curr.category_id,
                        is_pinned: curr.is_pinned,
                        author_id: curr.author_id,
                        created_at: curr.created_at     
                    }}/>
                )}
            </Container>
        </>
    );
}

export default Home;