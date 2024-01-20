import * as React from "react";
import { OutlinedInput, MenuItem, Select, SelectChangeEvent, Button, Box, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FC, useState } from "react";
import { DeleteCategoryProps } from "../../App.types";
import { RefreshPage } from "../../App";
import { categoryRemove } from "../Miscellaneous/apiRequests";

// handle Remove category by admin
const DeleteCategory: FC<DeleteCategoryProps> = ({ user, categories, handleModal }) => {
  const [categoryID, setCategoryID] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryID(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const confirmDelete = window.confirm(`Are you sure you want to delete Category?`)
    if (confirmDelete) {
      categoryRemove(Number(categoryID!))
        .then(response => {
          if(response.success) {
            alert('Category name deleted!');
            setTimeout(() => {RefreshPage();}, 500);
          }
          if('errors' in response && !response.success) handleModal(response.errors)
        }
      )
    }
  } 
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color='inherit' onClick={handleClickOpen} fullWidth sx={{padding:8}}>
        <Typography variant="overline">Delete Category</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle><Typography variant="overline"><b>Delete Category</b></Typography></DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ alignContent:'center',  width:300, height:150}}>
            <Select
              sx={{width:300}}
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

            <div className="right">
              <Button 
              onClick={handleClose}
              variant="text"
              sx={{ mt: 5, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
              >
                  <Typography variant='overline'>cancel</Typography>
              </Button>
              <Button
              type="submit"
              variant="text"
              sx={{ mt: 5, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
              >
                <Typography variant='overline'>Delete</Typography>
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
      
}

export default DeleteCategory;