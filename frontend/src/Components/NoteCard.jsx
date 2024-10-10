import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Avatar,
  CardContent,
  Grid,
  Button
} from "@mui/material";
import { Delete, Favorite, Share } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { Modals } from "./Modals";
import { DeleteModal } from "./DeleteModal";

export const NoteCard = ({ title, content, created_at, id }) => {
  const [open, setOpen] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const [fav, setFav] = useState(false);
  const [openDel, setOpenDel] = useState(false)

 const handleChange = () => {
  setFav(prev => !prev)
}

const handleOpenDel = () => {
  setOpenDel(true)
}
const handleCloseDel = () => {
  setOpenDel(false)
}
const iconColor = fav ? "teal": ''

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{
        maxWidth: 375,
        height: 'auto',
        borderRadius: '0.5em',
        transition: '.5s ease-in-out',
        "&:hover": {
          cursor: "pointer",
          boxShadow: '3px 3px 3px gray'
        }
      }}
      >
      <CardHeader 
      avatar={<Avatar sx={{bgcolor: "teal"}}>A</Avatar>}
      action={<IconButton onClick={handleOpenDel}>
        <Delete sx={{color: red[400]}} />
      </IconButton>}
      title={title}
      subheader={created_at}
      />
        <CardContent>
          {content}
        </CardContent>
        <CardActions>
          <IconButton onClick={handleChange}> 
            <Favorite sx={{color: iconColor}} />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
      </Grid>
      <Modals close={handleClose} open={open} details={content} title={title} />
      <DeleteModal open={openDel} close={handleCloseDel} note={title} id={id} />
    </>

  );
};
