import * as React from 'react';
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
import { AddPostProps, UserProps } from '../../App.types';
import { FC, useState } from 'react';
import { postNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';
const AddPost: FC<AddPostProps>= ({ user, categories, handleModal }) => {

  const user_id = 'id' in user ? user.id : -1;
  const [categoryID, setCategoryID] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const post = {
      title: (data.get('title') as string).trim(),
      body: data.get('body') as string,
      category_id: Number(categoryID),
      user_id: user_id
    }
    
    postNew(post)
      .then(response => {
        if (response.success) alert('post created!')
        if ('errors' in response && !response.success) handleModal(response.errors)
      })
    setTimeout(() => RefreshPage(), 1000)
    
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryID(event.target.value);
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
      <IconButton color='inherit' onClick={handleClickOpen} >
        <AddIcon />
      </IconButton>
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
            />
            
            <div className="left"><InputLabel id="select-category-label">Category</InputLabel>
              <Select
                sx={{width:200}}
                labelId="select-category-label"
                id="selectCategory"
                value={categoryID}
                label="Category"
                onChange={handleChange}
                required
                input={<OutlinedInput id='select-category-label' label=""  />}

                name='category'
                autoComplete=''
              >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
              </Select>
            </div>
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

export default AddPost;