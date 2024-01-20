import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { AddCategoryProps } from '../../App.types';
import { FC } from 'react';
import { categoryNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

// handle Adding new category by admin
const AddCategory: FC<AddCategoryProps> = ({ user, handleModal }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const category = { name: (data.get('name') as string).trim() };
    categoryNew(category)
      .then(response => {
        if (response.success) {
          alert('Category Created!');
          setTimeout(() => {RefreshPage();}, 500);
        }
        if ('errors' in response && !response.success) handleModal(response.errors)
      }
    )
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
      <Button color='inherit' onClick={handleClickOpen} fullWidth sx={{padding:8}}>
        <Typography variant="overline">New Category</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Typography variant='overline' fontSize={16}>Create Category</Typography></DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <InputLabel id="input-name-label">
            <Typography variant='overline' fontSize={10} color="black"><b>Category</b></Typography>
          </InputLabel>
          <Typography variant='overline' fontSize={10} color="black"><b>{count1}/20</b></Typography>
          </div>
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
              sx={{ mt: 3, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
            >
              <Typography variant='overline'>cancel</Typography>
              </Button>
            <Button
              type="submit"
              variant="text"
              sx={{ mt: 3, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
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

export default AddCategory;