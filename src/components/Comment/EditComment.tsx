import React, {  } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { EditCommentProps } from '../../App.types';
import { FC } from 'react';
import { commentEdit } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

//handle Edit Comment
const EditComment: FC<EditCommentProps>= ({ user, postID, comment, handleModal }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const com = {
        body: data.get('comment') as string,
        id: comment.id,
        user_id: comment.user_id,
        post_id: comment.post_id
      }
      commentEdit(com)
      .then(response => {
        if (response.success) {
          alert('Comment Edited!');
          setTimeout(() => RefreshPage(), 500);
        }
        if ('errors' in response && !response.success) handleModal(response.errors);
        setCount1(0);
        setOpen(false);
      })
    };

    const [open, setOpen] = React.useState(false);
    const [count1, setCount1] = React.useState(comment.body.length);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCount1(comment.body.length);
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
        <Typography variant="overline">Edit</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle><Typography variant='overline' fontSize={16}>Edit Comment</Typography></DialogTitle>
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
              label="Input Comment"
              name="comment"
              autoComplete="comment"
              autoFocus
              onChange={e => setCount1(e.target.value.length)}
              defaultValue= {comment.body? comment.body : ''}
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
                <Typography variant='overline'>Edit</Typography>
            </Button>
            
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditComment;