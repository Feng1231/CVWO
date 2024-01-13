import React, { FC, useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { CommentProps, FullPostProps, PostProps } from "../../App.types";
import { fetchPost } from "../Miscellaneous/apiRequests";
import CommentSection from "../Comment/CommentSection";
import AddComment from "../Comment/AddComment";
import  Moment  from 'moment';
const FullPost: FC<FullPostProps> = ({user, post, expandPostOpen, handleClosePost, handleModal, scroll}) => {
    let latest_date = post.updated_at;
    const date = Moment(latest_date).format('MMMM DD YYYY,  LT');
    const [fullPost, setFullPost] = useState<PostProps|null>(null);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const username = 'username' in user ? user.username : ""

    const handleSetComments = useCallback((comments:CommentProps[]) => {
        setComments(comments);
    }, [setComments]);
        
    useEffect(() => {
        fetchPost(post.id)
            .then(response => {
                if ('post' in response && response.success) {
                    setFullPost(response.post);
                    handleSetComments(response.comments);                }
                if ('errors' in response && !response.success) handleModal(response.errors);
            });
            
        },[handleModal, handleSetComments]
    );

    return (
        <>
            <Dialog open={expandPostOpen} onClose={handleClosePost} scroll={scroll} fullWidth maxWidth="xl">
                <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    { fullPost ? fullPost.title : '' }
                    <AddComment user={user} postID={post.id} handleModal={handleModal} />
                    </div>
                    </DialogTitle>

                    
                <DialogContent sx={{minWidth:500, minHeight:400}} dividers={scroll === 'paper'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="overline">{username}</Typography>
                        <Typography variant="overline">{`Last updated ${date}`}</Typography>
                    </div>
                    
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        { fullPost ? fullPost.body : '' }
                    </Typography>
                    <CommentSection user={user} post={post} comments={comments} handleModal={handleModal}/>
                </DialogContent>
                
            </Dialog>
        </>

    );
}

export default FullPost;