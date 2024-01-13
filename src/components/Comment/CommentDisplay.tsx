import React, { FC } from "react";
import { CommentDisplayProps, CommentProps } from "../../App.types";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import { ButtonGroup, ClickAwayListener, Container, Divider } from "@mui/material";
import  Moment  from 'moment';
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import { commentRemove } from "../Miscellaneous/apiRequests";
import { RefreshPage } from "../../App";
import { exit } from "process";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
  
const CommentDisplay: FC<CommentDisplayProps> = ({ key, user, comments, comment, handleModal }) => {
    const [expanded, setExpanded] = React.useState(false);
    const admin_level = 'admin_level' in user ? user.admin_level : -1;
    const userID = 'id' in user? user.id : -1;
    const [elevation, setElevation] = React.useState(1);
    let latest_date = comment.updated_at;
    const date = Moment(latest_date).format('MMMM DD YYYY,  LT');
    const relatedComments = comments.filter(secondaryComment => secondaryComment.comment_id === comment.id);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setElevation(20);
    };

    const handleClickAway = () => {
        setExpanded(false);
        setElevation(1);
    }

    const handleDeleteComment = (comment: CommentProps) => {
        const confirmDelete = window.confirm('Are you sure you want to Delete the Comment?');
        if (confirmDelete) {
            commentRemove(comment)
                .then (response => {
                    if(response.success) {
                        alert('Comment Deleted!');
                        setTimeout(() => RefreshPage(), 500);
                    }

                    if('errors' in response && !response.success) handleModal(response.errors);
                });
        }  
    }
    
    
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Card sx={{mb:2}} elevation={elevation}>
                <CardHeader
                    title={<Typography className="left" variant="overline">{comment.author}</Typography>}
                    subheader={<Typography className="right" variant="overline">{`Last updated ${date}`}</Typography>}
                >           
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {comment.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <AddComment user={user} postID={comment.post_id} handleModal={handleModal} commentID={comment.id} />
                    {comment.user_id === userID && <EditComment user={user} postID={comment.post_id} comment={comment} handleModal={handleModal} />}
                    {(comment.user_id === userID || admin_level === 1) &&
                        <Button 
                            sx={{ '&:hover': {backgroundColor: 'transparent'}}} 
                            size="small"
                            onClick={() => handleDeleteComment(comment)}
                        >
                            <Typography variant="overline">Delete</Typography>
                        </Button>
                    }
                    
                    {relatedComments.length > 0 &&
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more" 
                            sx={{ '&:hover': {backgroundColor: 'transparent'}}}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                </CardActions>
                {relatedComments.length > 0 && ( relatedComments.map(relatedComment => (
                    <Collapse in={expanded} timeout="auto" unmountOnExit onExit={() => setElevation(1) }>
                        <Divider/>
                        <CardHeader
                        title={<Typography className="left" variant="overline">{relatedComment.author}</Typography>}
                        subheader={<Typography className="right" variant="overline">{`Last updated ${Moment(relatedComment.updated_at).format('MMMM DD YYYY,  LT')}`}</Typography>}
                        ></CardHeader>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {relatedComment.body}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            {relatedComment.user_id === userID && <EditComment user={user} postID={relatedComment.post_id} comment={relatedComment} handleModal={handleModal} />}
                            {(comment.user_id === userID || admin_level === 1) &&
                                <Button 
                                    sx={{ '&:hover': {backgroundColor: 'transparent'}}} 
                                    size="small"
                                    onClick={() => handleDeleteComment(relatedComment)}
                                >
                                    <Typography variant="overline">Delete</Typography>
                                </Button>
                            }
                        </CardActions>
                    </Collapse>
                
                )))}
            </Card>
        </ClickAwayListener>
    );
}

export default CommentDisplay;







