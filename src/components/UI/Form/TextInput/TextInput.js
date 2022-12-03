import React from 'react';
import classes from './text-input.module.css'

const TextInput = ({children,type='text', ...props}) => {
    return (
        <label className={classes.textInputLabel}>
            <span>{children}</span>
            <input className={classes.textInput} type={type} {...props}/>
        </label>
    );
};

export default TextInput;