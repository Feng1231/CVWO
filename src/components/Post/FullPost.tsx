import React, { FC, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FullPostProps, PostProps } from "../../App.types";
import { fetchPost } from "../Miscellaneous/apiRequests";
import CommentSection from "../Comment/CommentSection";
import AddComment from "../Comment/AddComment";
import  Moment  from 'moment';
const FullPost: FC<FullPostProps> = ({user, post, expandPostOpen, handleClosePost, handleModal, scroll}) => {
    let latest_date = post.updated_at;
    const date = Moment(latest_date).format('MMMM DD YYYY,  LT');
    const [fullPost, setFullPost] = useState<PostProps|null>(null);
    const username = 'username' in user ? user.username : ""

    useEffect(() => {
        fetchPost(post.id)
            .then(response => {
                if ('post' in response && response.success) {
                    setFullPost(response.post);
                }
                if ('errors' in response && !response.success) handleModal(response.errors);
            });
            
        },[setFullPost]
    );

    return (
        <>
            <Dialog open={expandPostOpen} onClose={handleClosePost} scroll={scroll} >
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    { fullPost ? fullPost.title : '' }
                    <AddComment user={user} post={post} handleModal={handleModal} />
                    </div>
                    </DialogTitle>

                    
                <DialogContent sx={{minWidth:500, minHeight:400}} dividers={scroll === 'paper'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="overline">{username}</Typography>
                        <Typography variant="overline">{date}</Typography>
                    </div>
                    
                    <br />
                    <>{ fullPost ? fullPost.body : '' }</>
                    <CommentSection/>
                </DialogContent>
                
            </Dialog>
        </>

    );
}

export default FullPost;