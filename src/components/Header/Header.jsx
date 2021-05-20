import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = ({ name, backLink }) => {
    return (
        <div className={classes.header}>
            <NavLink to={backLink}>
                Go back
            </NavLink>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <span className={classes.headerName}>{name}</span>
        </div>
    )
}

export default Header;
