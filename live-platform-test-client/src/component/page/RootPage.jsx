import React from "react";
import { Link } from "react-router-dom";

const RootPage = (props) => {
    return (
    <>
        <h1>This is MainPage</h1>
        <Link to={"/broadcast"} onClick={() => props.setState(true)}>I'm Streamer</Link><br />
        <Link to={"/broadcast"} onClick={() => props.setState(false)}>I'm Viewer</Link>
    </>
    )
}

export default RootPage;