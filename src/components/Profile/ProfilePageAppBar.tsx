import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Link } from '@mui/material';
import { FC } from 'react';
import { ProfilePageAppBarProps } from '../../App.types';
import NoPage from '../../pages/NoPage';
import { useNavigate } from 'react-router-dom';

// display of profile page/ admin page app bar
const ProfilePageAppBar: FC<ProfilePageAppBarProps> = ({ user, handleLogout }) => {
  const userID = 'id' in user ? user.id : -1;
  const navigate = useNavigate();
  const handleUserLogout = () => {
    handleLogout();
    navigate('/SignIn');
  }
  return userID === -1 || !user.logged_in
  ? <NoPage statusCode={401}/>
  :(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href='/ ' color='white' underline='none'><Typography variant="overline">Back to Discum</Typography></Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Typography
            align="right"
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Button sx={{ '&:hover': {backgroundColor: 'transparent'}}} variant="text" color='inherit' size="large" onClick={handleUserLogout}><Typography variant="overline">Logout</Typography></Button>
          </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ProfilePageAppBar;