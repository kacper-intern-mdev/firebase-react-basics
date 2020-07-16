import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import PageviewSharpIcon from "@material-ui/icons/PageviewSharp";

import { makeStyles } from "@material-ui/core/styles";
import LikeButton from "../Likes";
import DeleteButton from "../DeleteButton";
import { useSelector } from "react-redux";

import firebase from "../../Firebase";
import { Dialog } from "@material-ui/core";
import SignInForm from "../SignIn";
import EditButton from "../Edit/EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  dateField: {
    fontSize: "0.8em",
    color: "rgba(0,0,0,.5)",
  },
  favourite: {},
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9em",
    color: "rgba(0,0,0,.6)",
  },
}));

const RecipeMenu = ({ recipe: { id, user }, likes, handleShowClick }) => {
  const classes = useStyles();

  const authUser = useSelector((state) => state.session?.authUser);

  const handleLikeClick = (val) => {
    firebase.recipeLikes(id).set({ [authUser?.id]: val }, { merge: true });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="view recipe"
        className={classes.icons}
        onClick={handleShowClick}
      >
        <PageviewSharpIcon />
      </IconButton>
      {authUser?.id === user && (
        <>
          <EditButton
            condition={authUser?.id === user}
            onYesClick={() => {
              console.log("Edit");
            }}
          />
          <DeleteButton
            condition={authUser?.id === user}
            onYesClick={(e) => {
              firebase.recipe(id).set({ deleted: true }, { merge: true });
            }}
          />
        </>
      )}
      {authUser ? (
        <LikeButton
          quantity={likes.length}
          isLiked={likes.some((like) => like === authUser?.id)}
          handleIconClick={handleLikeClick}
          authorized={authUser?.id}
        />
      ) : (
        <LikeButton
          quantity={likes.length}
          handleIconClick={handleClickOpen}
          authorized={authUser?.id}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <SignInForm />
      </Dialog>
    </>
  );
};

export default RecipeMenu;
