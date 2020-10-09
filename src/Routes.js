import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Post from "./Components/Post/Post";
import Form from "./Components/Form/Form";

export default (
  <Switch>
    <Route exact path="/">
      <Auth />
    </Route>
    <Route exact path="/dashboard">
      <Dashboard />
    </Route>
    <Route exact path="/post/:postid">
      <Post />
    </Route>
    <Route exact path="/new">
      <Form />
    </Route>
  </Switch>
);
