import React, { useEffect } from "react";
// eslint-disable-next-line
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchVideo from "./components/video/SearchVideo";
import PlayVideo from "./components/video/PlayVideo";
import Dashboard from "./components/video/Dashboard";
import UploadVideo from "./components/video/UploadVideo";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>{" "}
        <Route exact path="/video/:_id">
          <PlayVideo />
        </Route>{" "}
        <Route exact path="/search/:search">
          <SearchVideo />
        </Route>{" "}
        <Route exact path="/adminupload">
          <UploadVideo />
        </Route>{" "}
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App;
