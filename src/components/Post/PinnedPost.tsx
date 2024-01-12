import React , { FC }from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CategoryProps, PinnedPostProps, PostProps, User } from '../../App.types';
import Card from '@mui/material/Card';
import { CardActionArea, Divider, DialogProps, Button, CardActions, colors, ButtonGroup, Chip} from '@mui/material';
import FullPost from './FullPost';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Link } from 'react-router-dom';
import '../../assets/css/App.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { postHandlePin, postRemove } from '../Miscellaneous/apiRequests';
import { RefreshPage } from '../../App';
import EditPost from './EditPost';
import Moment from 'moment';
const PinnedPost: FC<PinnedPostProps> = ({ user, post, handleModal }) => {
    const username = 'username' in user ? user.username : ""
    const id = 'id' in user ? user.id : -1;
    const admin_level = "admin_level" in user? user.admin_level : 0;
    const latest_date = post.updated_at;
    const date = Moment(latest_date).format('MMMM DD YYYY,  LT');
    const [expandPostOpen, setExpandPostOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleExpandPost = (scrollType: DialogProps['scroll']) => () => {
        setExpandPostOpen(true);
        setScroll(scrollType);
    }
    const handleClosePost = () => {
        setExpandPostOpen(false);
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete the post?');
        if (confirmDelete) {
            postRemove(post.id)
                .then(response => {
                    if(response.success) alert('post.deleted!');
                    if('errors' in response && !response.success) handleModal(response.errors);
                })
            setTimeout(() => RefreshPage(), 1000);
        }
    }
    
    const handleUnpinPost = () => {
        postHandlePin(post.id)
            .then(response => {
                if ('errors' in response && !response.success) handleModal(response.errors)
            })
        setTimeout(()=> RefreshPage(), 500);
    }
    return (
        <Card
        sx={{
            position: 'relative',
            backgroundColor: '#E9E9E9',
            color: '#000',
            mt: 2,
            mb: 2,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
        >
            <CardActionArea onClick={handleExpandPost('paper')}>
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(255,255,255,0)',
                    }}
                />
                <Grid container>
                    <Grid item md={12}>
                    <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 3 },
                        pr: { md: 3 },
                        }}
                    >
                        <Typography variant="overline"> {`Category: ${post.category}`}</Typography>
                        <Typography variant="h6" color="inherit">
                            {post.title}
                        </Typography>
                        
                        <Divider >{`Last updated by ${username} on ${date}`}</Divider>
                        <Typography variant="body2" color="inherit" paragraph>
                            {post.body}
                        </Typography>
                    </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
            {((post.user_id === id) || admin_level === 1 ) && (
                <><CardActions>
                    <StarOutlineIcon sx={{ marginRight:"auto"}}/>
    
                    <ButtonGroup variant='outlined' color='inherit' sx={{ marginLeft: "auto" }}>
                    {admin_level === 1 && <Button onClick={handleUnpinPost}>UNPIN</Button>}
                    {post.user_id === id && <EditPost user={user} post={post} handleModal={handleModal}/>}
                    <Button onClick={handleDelete}>DELETE</Button>
                    </ButtonGroup>
                
                
                </CardActions>
                <FullPost user={user} 
                post={post}
                expandPostOpen={expandPostOpen}
                handleClosePost={handleClosePost} 
                handleModal={handleModal}
                scroll= {scroll}
                />
            </>
            )}
        </Card>
    );
    
}

export default PinnedPost;