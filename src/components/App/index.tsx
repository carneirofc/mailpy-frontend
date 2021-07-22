import React from "react";

import { createTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../Header";
import MainMenu from "../MainMenu";
import Routes from "../Routes";
import { useStyles } from "./styles";

export { useStyles } from "./styles";

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const theme = React.useMemo(() => {
    return createTheme({ palette: { type: darkTheme ? "dark" : "light" } });
  }, [darkTheme]);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header />
          <MainMenu />
          <Routes />
        </div>
      </ThemeProvider>
    </>
  );
}
export default App;
