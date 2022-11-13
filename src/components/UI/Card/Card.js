import React, {useState} from 'react';
import classes from './card.module.css'
import {Link} from "react-router-dom";
import testLogo from '../../../img/logo.svg'
import ImgLink from "../ImgLink/ImgLink";

// const Card = ({children, ...props}) => {
const Card = (props) => {
	return (
		<div className={classes.cardWrap}>
			<ImgLink page={props.page}/>
			<div className={classes.titleWrap}>
				<Link className={classes.title} to={props.page}>{props.header}</Link>
			</div>
		</div>
	);
};

export default Card;