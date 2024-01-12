import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { checkValidPostCreation } from '../Miscellaneous/loginFunctions';
import { EditPostProps, PostProps, UserProps } from '../../App.types';
import { FC, useState } from 'react';
import { fetchPost, postEdit } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';
const EditPost: FC<EditPostProps>= ({ user, post, handleModal }) => {
    
    const [fullPost, setFullPost] = useState<PostProps|null>(null);
    useEffect(() => {
        fetchPost(post.id)
            .then(response => {
                if ('post' in response && response.success) {
                    setFullPost(response.post);
                    if (fullPost) {
                        setCount1(fullPost.title.length);
                        setCount2(fullPost.body.length);
                    }
                }
                if ('errors' in response && !response.success) handleModal(response.errors);
            });
            
        },[setFullPost]
    );
    sessionStorage.setItem('fullPost', JSON.stringify(fullPost));
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
            if (response.success) alert('Post Edited!')
            if ('errors' in response && !response.success) handleModal(response.errors)
        })
        setTimeout(() => RefreshPage(), 1000)
        
    };

    const [open, setOpen] = React.useState(false);
    const [count1, setCount1] = React.useState(0);
    const [count2, setCount2] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  
  return (
    <>
      <Button color='inherit' onClick={handleClickOpen} >
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <label>
              <div className="left"><b>Title</b></div>
              <div className='right'>{count1}/50</div>
            </label>
            <TextField
              inputProps={{maxLength: 50}}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Input Title"
              name="title"
              autoComplete="Title"
              autoFocus
              onChange={e => setCount1(e.target.value.length)}
              defaultValue= {fullPost? fullPost.title : ''}
            />
            <label>
              <div className="left"><b>Body</b></div>
              <div className='right'>{count2}/2000</div>
            </label>
            <TextField
              inputProps={{maxLength: 2000}}
              multiline
              minRows={9}
              maxRows={9}    
              margin="normal"
              required
              fullWidth
              name="body"
              label="Input Body"
              type="body"
              id="body"
              autoComplete="Body"
              onChange={e => setCount2(e.target.value.length)}
              value={fullPost? fullPost.body : ''}
            />
            
            <div className="right">
            <Button 
              onClick={handleClose}
              variant="text"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="text"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
            
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditPost;