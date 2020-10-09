import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Nav from "./Components/Nav/Nav";
import Routes from "./Routes";
import store from "./Redux/store";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Nav />
        {Routes}
      </Provider>
    </HashRouter>
  );
}

export default App;
