import React, { useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { EditPostProps, PostProps } from '../../App.types';
import { FC, useState } from 'react';
import { fetchPost, postEdit } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

// handles editing of existing post
const EditPost: FC<EditPostProps>= ({ user, post, handleModal }) => {
    
    const [fullPost, setFullPost] = useState<PostProps|null>(null);
    const [open, setOpen] = React.useState(false);
    const [count1, setCount1] = React.useState(post.title.length);
    const [count2, setCount2] = React.useState(post.body.length);
    const handleSetFullPost = useCallback((post:PostProps) => setFullPost(post),[setFullPost]);
    useEffect(() => {
        fetchPost(post.id)
            .then(response => {
                if ('post' in response && response.success) {
                    setFullPost(response.post);
                    if (fullPost !== null) {
                        setCount1(fullPost.title.length);
                        setCount2(fullPost.body.length);
                    }
                }
                if ('errors' in response && !response.success) handleModal(response.errors);
            });
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[post.id, handleSetFullPost, handleModal, setOpen]
    );
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const editedPost = {
            postID: post.id,
            post: {
                title: (data.get('title') as string).trim(),
                body: data.get('body') as string
            }
        }
        
        postEdit(editedPost)
        .then(response => {
            if (response.success) {
              alert('Post Edited!');
              setTimeout(() => RefreshPage(), 500);
            }
            if ('errors' in response && !response.success) handleModal(response.errors)
        })
        
    };



    const handleClickOpen = () => {
        setOpen(true);
        setCount1(fullPost? fullPost.title.length : 0);
        setCount2(fullPost? fullPost.body.length: 0);
    };

    const handleClose = () => {
        setOpen(false);
    };
  
  return (
    <>
      <Button color='inherit' onClick={handleClickOpen} >
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle><Typography variant='overline' fontSize={16}>Edit Post</Typography></DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputLabel id="title-label">
              <Typography variant='overline' fontSize={10} color="black"><b>Title</b></Typography>
            </InputLabel>
            <Typography variant='overline' fontSize={10} color="black"><b>{count1}/50</b></Typography>
            </div>
            <TextField
              inputProps={{maxLength: 50}}
              required
              fullWidth
              id="title"
              label="Input Title"
              name="title"
              autoComplete="Title"
              autoFocus
              onChange={e => setCount1(e.target.value.length)}
              defaultValue= {fullPost ? fullPost.title : ''}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <InputLabel id="body-label">
                <Typography variant='overline' fontSize={10} color="black"><b>Body</b></Typography>
              </InputLabel>
              <Typography variant='overline' fontSize={10} color="black"><b>{count2}/2000</b></Typography>
            </div>
            <TextField
              inputProps={{maxLength: 2000}}
              multiline
              minRows={9}
              maxRows={9}    
              required
              fullWidth
              name="body"
              label="Input Body"
              type="body"
              id="body"
              autoComplete="Body"
              onChange={e => setCount2(e.target.value.length)}
              defaultValue={fullPost? fullPost.body : ''}
            />
            
            <div className="right">
            <Button 
              onClick={handleClose}
              variant="text"
              color='primary'
              sx={{ mt: 4, mb: 1 ,'&:hover': {backgroundColor: 'transparent'}}}
            >
              <Typography variant='overline'>cancel</Typography>
            </Button>
            <Button
              type="submit"
              variant="text"
              color='primary'
              sx={{ mt: 4, mb: 1 ,'&:hover': {backgroundColor: 'transparent'}}}

            >
              <Typography variant='overline'>Edit</Typography>
              
            </Button>
            
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditPost;