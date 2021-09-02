import Typography from "@material-ui/core/Typography";
import ButtonProtected from "./ButtonProtected";
import { useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { fetchConditions, fetchEntries, fetchGroups } from "../actions/mailpy";
function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchConditions());
    dispatch(fetchEntries());
    dispatch(fetchGroups());
  }, []);
  return (
    <>
      <Typography paragraph>
        EPICS PV monitoring system. Check their the specified operation values and send an e-mail to a list of targets
        with a warning message if the based on the specified condition.
      </Typography>
      <ButtonProtected />
    </>
  );
}
export default Home;
