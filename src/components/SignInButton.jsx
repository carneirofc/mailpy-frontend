import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import { signIn as ActionSignIn, signOut as ActionSignOut } from "../actions/Actions";

import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  green: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

const SignInButton = ({ children, ...props }) => {
  const { green, red } = useStyles(props);
  const identity = useSelector((state) => state.identity);
  const buttonText = identity ? "Sign Out" : "Sign In";
  const buttonStyle = identity ? red : green;
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(identity ? ActionSignOut() : ActionSignIn());
  };

  const renderButton = () => {
    return (
      <ListItem className={`${buttonStyle}`} onClick={onClickHandler}>
        <ListItemText style={{ textAlign: "center" }}>{buttonText}</ListItemText>
      </ListItem>
    );
  };

  return <React.Fragment>{renderButton()}</React.Fragment>;
};

export default SignInButton;
