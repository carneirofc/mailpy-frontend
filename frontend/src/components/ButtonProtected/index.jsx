import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import api from "../../controllers/api";

const ButtonProtect = ({ children, ...props }) => {
  const identity = useSelector((state) => state.identity);
  const text = identity ? "Call Test API" : "Please Login";
  const disabled = identity ? false : true;
  const onClickHandler = async () => {
    await api.getProtected(identity.idToken).then((res) => console.log("Protected API", res));
  };
  return (
    <Button variant="contained" color="primary" onClick={onClickHandler} disabled={disabled}>
      {text}
    </Button>
  );
};

export default ButtonProtect;
