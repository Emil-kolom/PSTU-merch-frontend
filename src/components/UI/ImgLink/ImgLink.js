import React, {useState} from 'react';
import classes from "./imgLink.module.css";
import testLogo from "../../../img/logo.svg";
import {Link} from "react-router-dom";

const ImgLink = ({page,MainImg, ...props}) => {
    const [isHoverVisible, setHoverVisible] = useState(false)
    let hoverLink = <div className={classes.hoverWrap}>
        <button
            className={classes.hoverItem}
        >Перейти!</button>
    </div>
    return (
        <Link to={page}
              className={classes.cardRoot}
              onMouseEnter={() => setHoverVisible(true)}
              onMouseLeave={() => setHoverVisible(false)}
              {...props}
        >
            <img className={classes.imgContainer} src={MainImg} alt={page + 'img'}/>
            {isHoverVisible ? hoverLink : null}
        </Link>
    );
};

export default ImgLink;