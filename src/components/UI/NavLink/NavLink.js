import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useMeasure} from "react-use";
import classes from './nav-link.module.css'

const NavLink = ({to,children}) => {
    return (
        <Link className={classes.navLink} to={to}>
            {children}
        </Link>
    );
};

export default NavLink;