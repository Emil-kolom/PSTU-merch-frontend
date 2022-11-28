import React from 'react';
import classes from './redButton.module.css'

const RedButton = ({children, appendClass='', ...props}) => {
    return (
        <button {...props} className={classes.bigRedButton + ' ' + appendClass}>
            {children}
        </button>
    );
};

export default RedButton;