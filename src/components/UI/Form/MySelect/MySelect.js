import React from 'react';
import classes from "./my-select.module.css";

const MySelect = ({selectOption = [], onSelect, selectValue,children, ...props}) => {
    return (
        <label className={classes.labelBox}>
            <span>{children}</span>
            <select value={selectValue} className={classes.mySelect}>
                {
                    selectOption.map((optionVal) => {
                        return <option value={optionVal.value}>{optionVal.name}</option>
                    })
                }
            </select>
        </label>
    );
};

export default MySelect;