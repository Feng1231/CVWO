import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '../assets/css/App.css';
import { checkValidPostCreation } from './loginFunctions';

export default function AddPost() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    //to add connection to DB
    checkValidPostCreation(data);
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
      <IconButton color='inherit' onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Box component="form" action="Profile" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            />
            <label>
              <div className="left"><b>Title</b></div>
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