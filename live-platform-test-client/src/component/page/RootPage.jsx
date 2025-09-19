import React from "react";
import { Link } from "react-router-dom";

const RootPage = () => {
  return (
    <>
      <h1>MainPage</h1>
      <Link to={"/broadcast"}>I'm Streamer</Link>
      <br />
      <Link to={"/live-list"}>I'm Viewer</Link>
    </>
  );
};

export default RootPage;
