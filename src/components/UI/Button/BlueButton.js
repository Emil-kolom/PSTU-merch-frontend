import React from 'react';
import classes from './blueButton.module.css'
import LeftArrow from "../../../img/svg/leftArrow";

const BlueButton = ({children, ...props}) => {
    return (
        <>
            <LeftArrow></LeftArrow>
            <button {...props} className={classes.blueButton}>
                {children}
            </button>
        </>
    );
};

export default BlueButton;