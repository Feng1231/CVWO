import React from 'react';
import Header from '../components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import PinnedPost from '../components/PinnedPost';
import NonPinnedPost from '../components/NonPinnedPost';
import { Button, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import { User, Post } from '../App.types';
import { categories, myPinnedPosts, myPosts } from '../App';

const MyPosts = () => {
    //to remove, for dev purpose only
    return (
        <>
            <CssBaseline />
            <PrimarySearchAppBar />
            <Container maxWidth='xl'>
                <Header title='MyPosts' />
                {myPinnedPosts.length > 0 && myPinnedPosts.map((curr) => (
                    <><PinnedPost post={{
                        post_id: curr.post_id,
                        body: curr.body,
                        title: curr.title,
                        category_id: curr.category_id,
                        is_pinned: curr.is_pinned,
                        author_id: curr.author_id,
                        created_at: curr.created_at     
                    }} /></>
                ))}
                
                {categories.map((catEle) =><>
                    {myPosts
                        .filter(postEle => postEle.category_id === catEle.category_id).length > 0 && (
                            <><Divider><Chip label={catEle.name} size='medium' /></Divider>
                            {myPosts
                                .filter(postEle => postEle.category_id === catEle.category_id)
                                .map((curr) => 
                                    <NonPinnedPost post={{
                                        post_id: curr.post_id,
                                        body: curr.body,
                                        title: curr.title,
                                        category_id: curr.category_id,
                                        is_pinned: curr.is_pinned,
                                        author_id: curr.author_id,
                                        created_at: curr.created_at
                                    }} />
                                )
                            }</>
                        )
                    }</>
                )}
            </Container>
        </>
    );
}

export default MyPosts;
