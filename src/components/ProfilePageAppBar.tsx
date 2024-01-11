import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { FC } from 'react';
import { ProfilePageAppBarProps } from '../App.types';
import NoPage from '../pages/NoPage';
import { useParams } from 'react-router-dom';

const ProfilePageAppBar: FC<ProfilePageAppBarProps> = ({ user }) => {
  let { id } = useParams();
  const userID = 'id' in user ? user.id : -1;
  return id === "-1" || !user.logged_in  || userID !== Number(id)
  ? <NoPage statusCode={401}/>
  : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href='/ ' color='white' underline='none'>Back to Discum</Link>
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
            <Link href='/SignIn' color='white' underline='none'>Logout</Link>
          </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ProfilePageAppBar;