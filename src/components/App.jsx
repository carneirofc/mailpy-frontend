import React from "react";

import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./Header";
import MainMenu  from './MainMenu';
import Content from "./Content";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar, /* necessary for content to be below app bar */
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header classes={classes} />
            <MainMenu classes={classes} />
            <Content classes={classes} />
        </div>
    );
}
export default App;
export { useStyles };