import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

import { signIn as ActionSignIn, signOut as ActionSignOut } from "../../actions/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useStyles } from "./styles";

const SignInButton = ({ ...props }) => {
  const { green, red } = useStyles(props);
  const identity = useAppSelector((state) => state.appReducer.identity);
  const buttonText = identity ? "Sign Out" : "Sign In";
  const buttonStyle = identity ? red : green;
  const dispatch = useAppDispatch();

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
