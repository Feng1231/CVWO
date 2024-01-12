import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { OutlinedInput, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { checkValidPostCreation } from '../Miscellaneous/loginFunctions';
import { useParams } from 'react-router-dom';
import { RenameCategoryProps, UserProps } from '../../App.types';
import { FC, useState } from 'react';
import { categoryEdit, categoryNew } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

const RenameCategory: FC<RenameCategoryProps> = ({ user, categories, handleModal }) => {

    const admin_level = 'admin_level' in user ? user.admin_level : -1;
    const [categoryID, setCategoryID] = useState<string>();
    
    const handleChange = (event: SelectChangeEvent) => {
        setCategoryID(event.target.value);
        console.log((event.target.value));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const category = { 
            id: Number(categoryID),
            name: (data.get('name') as string).trim() 
        };
        categoryEdit(category)
            .then(response => {
                if (response.success) alert('Category name upated!');
                if ('errors' in response && !response.success) handleModal(response.errors);
            });
        setTimeout(() => {RefreshPage();}, 1000);
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
            Rename Category
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rename Category</DialogTitle>
            <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
            <InputLabel id="select-category-label">Category</InputLabel>
                <Select
                    sx={{mt:1, mb:3}}
                    fullWidth
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
                <div className='left'>
                <InputLabel id="new-category-name-label">New Category Name</InputLabel>
                </div>
                <div className='right'>{count1}/20</div>
                <TextField
                    sx={{mt:1}}
                    inputProps={{maxLength: 20}}
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
                Rename
                </Button>
                </div>
            </Box>
            </DialogContent>
        </Dialog>
        </>
    );
}

export default RenameCategory;