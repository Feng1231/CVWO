import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NonPinnedPostProps } from '../../App.types';
import Card from '@mui/material/Card';
import { Button, ButtonGroup, CardActionArea, CardActions, DialogProps, Divider} from '@mui/material';
import FullPost from './FullPost';
import { FC } from 'react';
import  Moment  from 'moment';
import { RefreshPage } from '../../App';
import { postHandlePin, postRemove } from '../Miscellaneous/apiRequests';
import EditPost from './EditPost';

// handles display of non pinned post
const NonPinnedPost: FC<NonPinnedPostProps> = ({ user, post, handleModal }) =>{
    const username = 'username' in user ? user.username : ""
    const id = 'id' in user ? user.id : -1;
    const admin_level = "admin_level" in user? user.admin_level : 0;
    let latest_date = post.updated_at;
    const date = Moment(latest_date).format('MMMM DD YYYY,  LT');
    /////////////////////////////////////////////////////
    sessionStorage.setItem('post', JSON.stringify(post))
    /////////////////////////////////////////////////////
    const [expandPostOpen, setExpandPostOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleExpandPost = (scrollType: DialogProps['scroll']) => () => {
        setExpandPostOpen(true);
        setScroll(scrollType);
    }
    const handleClosePost = () => {
        setExpandPostOpen(false);
    }

    const handlePinPost = () => {
        postHandlePin(post.id)
            .then(response => {
                if (response.success) setTimeout(()=> RefreshPage(), 500);
                if ('errors' in response && !response.success) handleModal(response.errors)
            })

    }
    const handleDelete = () => {

        const confirmDelete = window.confirm('Are you sure you want to delete the post?');
        if (confirmDelete) {
            postRemove(post.id)
                .then(response => {
                    if(response.success) {
                        alert('Post Deleted!');
                        setTimeout(() => RefreshPage(), 500);
                    }
                    if('errors' in response && !response.success) handleModal(response.errors);
                })
        }
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
                        <Typography variant="overline">{`Category: ${post.category}`}</Typography>
                        <Typography variant="h6" color="text.primary">{post.title}</Typography>
                        <Divider><Typography variant="overline">{`Last updated by ${post.author} on ${date}`}</Typography></Divider>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {post.body.length === 33 ? post.body + '...' : post.body}
                        </Typography>
                    </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
            {((post.user_id === id) || admin_level === 1 ) && (
            <><CardActions>
            <ButtonGroup variant='outlined' color='inherit' sx={{ marginLeft: "auto" }}>
                {admin_level === 1 && <Button onClick={handlePinPost}>PIN</Button>}
                {post.user_id === id && <EditPost user={user} post={post} handleModal={handleModal}/>}
                <Button onClick={handleDelete}>DELETE</Button>
            </ButtonGroup>
            
            </CardActions></>)}  
            <FullPost 
                user={user} 
                post={post}
                expandPostOpen={expandPostOpen}
                handleClosePost={handleClosePost} 
                handleModal={handleModal}
                scroll= {scroll}
            />
                        
        </Card>
    );
    
}

export default NonPinnedPost;