import React from 'react';
import classes from './text-input.module.css'

const TextInput = ({name, value, children, ...props}) => {
    return (
        <label className={classes.textInputLabel}>
            <span>{children}</span>
            <input className={classes.textInput} type={"text"} value={value}/>
        </label>
    );
};

export default TextInput;