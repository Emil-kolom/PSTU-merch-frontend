import React from 'react';
import classes from './text-input.module.css'

const TextInput = ({children, ...props}) => {
    return (
        <label className={classes.textInputLabel}>
            <span>{children}</span>
            <input className={classes.textInput} type={"text"} {...props}/>
        </label>
    );
};

export default TextInput;