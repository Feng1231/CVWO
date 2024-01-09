import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ExpandPostProps } from "../App.types";
export default function FullPost (props: ExpandPostProps) {
    const { post } = props;
    // const [open, setOpen] = React.useState(false);
    const handleClosePost = props.handleClosePost;
    const expandPostOpen = props.expandPostOpen;
    const scroll = props.scroll;
    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    return (
        <>
            <Dialog open={expandPostOpen} onClose={handleClosePost} scroll={scroll} >
                <DialogTitle>{ post.title }</DialogTitle>

                <DialogContent sx={{minWidth:600, minHeight:500}} dividers={scroll === 'paper'}>{ post.body }</DialogContent></Dialog>
        </>

    );
}