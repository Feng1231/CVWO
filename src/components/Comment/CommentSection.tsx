import { Container, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { FC, useState } from "react";
import { CommentProps, CommentSectionProps } from "../../App.types";
import { RefreshPage } from "../../App";
import CommentDisplay from "./CommentDisplay";

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
          <Typography variant="overline" >Comments {comments.length===0 && <>(There's nothing yet!)</>}</Typography>
        </Divider>
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