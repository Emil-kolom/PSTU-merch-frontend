import React from 'react';
import classes from "./myTextarea.module.css";

const MyTextarea = ({children, ...props}) => {
    return (
        <label className={classes.labelBox}>
            <span>{children}</span>
            <textarea {...props} className={classes.myArea}/>
        </label>
    );
};

export default MyTextarea;