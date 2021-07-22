import Typography from "@material-ui/core/Typography";
import ButtonProtected from "./ButtonProtected";
import { useAppSelector } from "../app/hooks";
function Home() {
  const netRequests = useAppSelector((state) => state.networkRequests);
  return (
    <>
      <Typography paragraph>
        EPICS PV monitoring system. Check their the specified operation values and send an e-mail to a list of targets
        with a warning message if the based on the specified condition.
      </Typography>
      <ButtonProtected />
      <div style={{ margin: "15rem" }}>
        <h2>Application Debug</h2>
        <table>
          <tr>
            <th>Pending Network Requests</th>
          </tr>
          <tr>
            <td>{netRequests}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
export default Home;
