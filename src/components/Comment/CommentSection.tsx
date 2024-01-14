import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FC } from "react";
import { CommentProps, CommentSectionProps } from "../../App.types";
import CommentDisplay from "./CommentDisplay";

// Display the comment section when expand post
const CommentSection: FC<CommentSectionProps> = ({ user, post, comments, handleModal }) => {
    const populateComments = (commentsArray:CommentProps[]) => commentsArray.filter((comment) => !comment.comment_id).map((comment) => (
        <CommentDisplay
          key={comment.id}
          user={user}
          comments={comments}
          comment={comment}
          handleModal={handleModal}
        />
      ));

    return (
      <>
        <Divider sx={{mt:10}}>
          
          <Typography variant="overline" >
            Comments 
            {/* only displays when no comment under this post */}
            {comments.length===0 && <>(There's nothing yet!)</>}
            </Typography>
        </Divider>
        {/* only displays when no comment under this post */}
        {comments.length === 0 && 
          <Typography 
            variant="overline" 
            sx={{ display:"flex", justifyContent:"center", alignItems:"center"}}
          >
            Be the First to Comment.
          </Typography>}
        {populateComments(comments)}

      </>
    )
}
    export default CommentSection;