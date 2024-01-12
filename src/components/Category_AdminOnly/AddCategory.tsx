import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { checkValidPostCreation } from '../Miscellaneous/loginFunctions';
import { useParams } from 'react-router-dom';
import { AddCategoryProps, UserProps } from '../../App.types';
import { FC } from 'react';
import { categoryNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';
const AddCategory: FC<AddCategoryProps> = ({ user, handleModal }) => {

  const admin_level = 'admin_level' in user ? user.admin_level : -1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const category = { name: (data.get('name') as string).trim() };
    categoryNew(category)
      .then(response => {
        if (response.success) RefreshPage()
        if ('errors' in response && !response.success) handleModal(response.errors)
      })
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
      <Button color='inherit' onClick={handleClickOpen} >
        New Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <label>
              <div className="left"><b>Name</b></div>
              <div className='right'>{count1}/20</div>
            </label>
            <TextField
              inputProps={{maxLength: 20}}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Input category name"
              name="name"
              autoFocus
              onChange={e => setCount1(e.target.value.length)}
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

export default AddCategory;