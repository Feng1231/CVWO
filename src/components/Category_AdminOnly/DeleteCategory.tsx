import * as React from "react";
import { OutlinedInput, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Box, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import { DeleteCategoryProps } from "../../App.types";

import { RefreshPage } from "../../App";
import { categoryNew, categoryRemove } from "../Miscellaneous/apiRequests";

const DeleteCategory: FC<DeleteCategoryProps> = ({ user, categories, handleModal }) => {
    const admin_level = 'admin_level' in user ? user.admin_level : -1;
    const [categoryID, setCategoryID] = useState<string>();

    const handleChange = (event: SelectChangeEvent) => {
        setCategoryID(event.target.value);
        console.log((event.target.value));
    };

    const [open, setOpen] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const confirmDelete = window.confirm(`Are you sure you want to delete Category?`)
        console.log(typeof categoryID )
        if (confirmDelete) {
            categoryRemove(Number(categoryID!))
                .then(response => {
                    if(response.success) alert('category deleted !')
                    if('errors' in response && !response.success) handleModal(response.errors)
                    RefreshPage();
                })
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
          <Button color='inherit' onClick={handleClickOpen} >
            Delete Category
          </Button>
          <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Delete Category</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit} sx={{ alignContent:'center',  width:300, height:200}}>

                <InputLabel id="select-category-label">Category</InputLabel>
                <Select
                    sx={{width:300}}
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

                <div className="right">
                <Button 
                onClick={handleClose}
                variant="text"
                sx={{ mt: 10, mb: 2 }}
                >
                    Cancel
                </Button>
                <Button
                type="submit"
                variant="text"
                sx={{ mt: 10, mb: 2 }}
                >
                Delete
                </Button>
                </div>

              </Box>
            </DialogContent>
          </Dialog>
        </>
      );
       
}

export default DeleteCategory;