import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { OutlinedInput, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import '../../assets/css/App.css';
import { RenameCategoryProps } from '../../App.types';
import { FC, useState } from 'react';
import { categoryEdit } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';

// handle Renaming category by admin
const RenameCategory: FC<RenameCategoryProps> = ({ user, categories, handleModal }) => {
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
                if (response.success) {
                    alert('Category name upated!');
                    setTimeout(() => {RefreshPage();}, 500);
                }
                if ('errors' in response && !response.success) handleModal(response.errors);
            }
        );
        
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
            <Typography variant="overline">Rename Category</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle><Typography variant='overline' fontSize={16}>Rename Category</Typography></DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                    <InputLabel id="select-category-label">
                        <Typography variant='overline' fontSize={10} color="black"><b>Category</b></Typography>
                    </InputLabel>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <InputLabel id="input-name-label">
                                <Typography variant='overline' fontSize={10} color="black"><b>Category Name</b></Typography>
                            </InputLabel>
                            <Typography variant='overline' fontSize={10} color="black"><b>{count1}/20</b></Typography>
                        </div>
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
                                sx={{ mt: 3, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
                            >
                                <Typography variant='overline'>cancel</Typography>
                            </Button>
                            <Button
                                type="submit"
                                variant="text"
                                sx={{ mt: 3, mb: 2, '&:hover': {backgroundColor: 'transparent'} }}
                            >
                                <Typography variant='overline'>Rename</Typography>
                            </Button>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default RenameCategory;