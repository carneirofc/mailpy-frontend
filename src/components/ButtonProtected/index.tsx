import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { RootState } from "../../app/store";
import api from "../../controllers/api";

const ButtonProtect = () => {
  const identity = useSelector((state: RootState) => state.identity);
  const text = identity ? "Call Test API" : "Please Login";
  const disabled = identity ? false : true;
  const onClickHandler = async () => {
    await api.getProtected().then((res) => console.log("Protected API", res));
  };
  return (
    <Button variant="contained" color="primary" onClick={onClickHandler} disabled={disabled}>
      {text}
    </Button>
  );
};

export default ButtonProtect;
