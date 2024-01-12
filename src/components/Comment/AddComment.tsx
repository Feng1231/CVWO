import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { checkValidPostCreation } from '../Miscellaneous/loginFunctions';
import { useParams } from 'react-router-dom';
import { AddCommentProps, UserProps } from '../../App.types';
import { FC } from 'react';
import { categoryNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

const AddComment: FC<AddCommentProps> = ({ user, post, handleModal }) => {

  const admin_level = 'admin_level' in user ? user.admin_level : -1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpen(false);
    
  };
  const [open, setOpen] = React.useState(false);
  const [count1, setCount1] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Button 
        sx={{ '&:hover': {backgroundColor: 'transparent'}}}
        size="small" 
        color='inherit' 
        variant="text" 
        onClick={handleClickOpen}
      >
        <Typography variant="overline">comment</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <label>
              <div className="left"><b>Comment</b></div>
              <div className='right'>{count1}/400</div>
            </label>
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
              sx={{ mt: 3, mb: 2 }}
            >
                Cancel
              </Button>
            <Button
              type="submit"
              variant="text"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddComment;