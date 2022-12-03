import React from 'react';
import classes from "./my-select.module.css";

const MySelect = ({selectOption = [], children, ...props}) => {
    return (
        <label className={classes.labelBox}>
            <span>{children}</span>
            <select className={classes.mySelect} {...props}>
                {
                    selectOption.map((optionVal, index) => {
                        return <option
                            key={index}
                            value={optionVal}>{optionVal}</option>
                    })
                }
            </select>
        </label>
    );
};

export default MySelect;