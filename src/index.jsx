import React from "react";
import ReactDOM from "react-dom";

import "./css/index.css";

import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "./store";

import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoryRouter basename={window.location.pathname}>
        <App />
      </MemoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
