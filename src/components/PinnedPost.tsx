import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CategoryProps, PostProps, User } from '../App.types';
import Card from '@mui/material/Card';
import { CardActionArea, Divider, DialogProps, Button, CardActions, colors, ButtonGroup, Chip} from '@mui/material';
import FullPost from './FullPost';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import { categories, curr_user } from '../App';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
export default function NonPinnedPost(postProps: PostProps) {
    const { post } = postProps;
    const curr_cat = categories.find(ele => ele.category_id === post.category_id);
    const [expandPostOpen, setExpandPostOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleExpandPost = (scrollType: DialogProps['scroll']) => () => {
        setExpandPostOpen(true);
        setScroll(scrollType);
    }
    const handleClosePost = () => {
        setExpandPostOpen(false);
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
                        <Typography variant="h6" color="inherit">
                            {post.title}
                        </Typography>
                        <Divider >{curr_cat!.name}</Divider>
                        <Typography variant="body2" color="inherit" paragraph>
                            {post.body}
                        </Typography>
                    </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
            {((post.author_id === curr_user.id) || curr_user.admin_level === 1 ) && (
                <><CardActions>
                    <StarOutlineIcon sx={{ marginRight:"auto"}}/>
                <ButtonGroup variant='outlined' color='inherit' sx={{ marginLeft: "auto" }}>
                    {curr_user.admin_level === 1 && <Button>UNPIN</Button>}
                    {post.author_id === curr_user.id && <Button>EDIT</Button>}
                    <Button>DELETE</Button>
                </ButtonGroup>
                
                </CardActions>
                <FullPost post = {{
                    post_id: post.post_id,
                    body: post.body,
                    title: post.title,
                    category_id: post.category_id,
                    is_pinned: post.is_pinned,
                    author_id: post.author_id,
                    created_at: post.created_at     
                }}
                expandPostOpen={expandPostOpen}
                handleClosePost={handleClosePost} 
                scroll= {scroll}/></>
            )}
        </Card>
    );
    
}

