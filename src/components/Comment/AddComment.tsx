import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { AddCommentProps } from '../../App.types';
import { FC } from 'react';
import { commentNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

// Handle Adding comment
const AddComment: FC<AddCommentProps> = ({ user, postID, handleModal, commentID }) => {
    const text = commentID ? "Reply" : "Comment";
    const userID = 'id' in user? user.id : -1;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const comment = {
            body: data.get('comment') as string,
            user_id: userID,
            post_id: postID,
            comment_id: commentID
        }
        commentNew(comment)
            .then (response => {
                if(response.success) {
                    alert('Comment Added!');
                    setTimeout(() => RefreshPage(), 500);
                }
                if('errors' in response && !response.success) handleModal(response.errors);
                setOpen(false);
                setCount1(0);
            }
        );
    };

    const [open, setOpen] = React.useState(false);
    const [count1, setCount1] = React.useState(0);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCount1(0);
    };
    
    return (
        <>
            <Button 
                sx={{ '&:hover': {backgroundColor: 'transparent'}}}
                size="small" 
                color='primary' 
                variant="text" 
                onClick={handleClickOpen}
            >
                <Typography variant="overline">{text}</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle><Typography variant='overline' fontSize={16}>New comment</Typography></DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <InputLabel id="input-comment-label">
                                <Typography variant='overline' fontSize={10} color="black"><b>Comment</b></Typography>
                            </InputLabel>
                            <Typography variant='overline' fontSize={10} color="black"><b>{count1}/400</b></Typography>
                        </div>                
                        <TextField
                            inputProps={{maxLength: 400}}
                            margin="normal"
                            required
                            fullWidth
                            id="comment"
                            label="Input comment"
                            name="comment"
                            autoFocus
                            onChange={e => setCount1(e.target.value.length)}
                            multiline
                            maxRows={9} 
                            minRows={9}
                            
                        
                        />
                        <div className="right">
                            <Button 
                                onClick={handleClose}
                                variant="text"
                                sx={{ mt: 3, mb: 2 , '&:hover': {backgroundColor: 'transparent'}}}
                            >
                                <Typography variant='overline'>Cancel</Typography>
                            </Button>
                            <Button
                                type="submit"
                                variant="text"
                                sx={{ mt: 3, mb: 2 , '&:hover': {backgroundColor: 'transparent'}}}
                            >
                                <Typography variant='overline'>Submit</Typography>
                            </Button>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AddComment;