import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuListComposition from './MenuListComposition';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddPost from '../Post/AddPost';
import { PrimarySearchAppBarProps } from '../../App.types';
import { FC } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//App Bar display for Forum Page
const PrimarySearchAppBar: FC<PrimarySearchAppBarProps> = ({ user, categories, handleLogout, handleModal, handleSearchPost }) => {
  const userID = 'id' in user ? user.id : -1;
  const adminLevel = 'admin_level' in user ? user.admin_level : 0
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleUserLogout = () =>{
    setAnchorEl(null);
    handleLogout();
    navigate('/SignIn');
  }

  const handleProfileNavigation = () => {
    setAnchorEl(null);
    navigate(`/users/${userID}`);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ zIndex: 10000 }} 
    >
      <MenuItem onClick={handleProfileNavigation}>
        <Typography variant='overline'>Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handleUserLogout}>
        <Typography variant='overline'>Logout</Typography>
      </MenuItem>
    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 1, '&:hover': {backgroundColor: 'transparent'}}}
          >
            <MenuListComposition user={user} categories={categories} handleModal={handleModal}/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href='/ ' color='white' underline='none'><Typography variant="overline">Discum</Typography></Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Post Title…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleSearchPost(e.target.value)}
            />
          </Search>
          <AddPost user={user} categories={categories} handleModal={handleModal} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {adminLevel === 1 && (
              <Button sx={{'&:hover': {backgroundColor: 'transparent'}}} variant="text" color="inherit" onClick={() => navigate('/admin')}><Typography variant='overline'>Admin</Typography></Button>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{'&:hover': {backgroundColor: 'transparent'}}}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
export default PrimarySearchAppBar;