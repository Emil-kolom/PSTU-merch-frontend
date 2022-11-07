import React, {useState} from 'react';
import classes from './card.module.css'
import {Link, Navigate} from "react-router-dom";
import testLogo from '../../../img/logo.svg'
import {Button} from "@mui/material";

// const Card = ({children, ...props}) => {
const Card = (props) => {
	const [isHoverVisible, setHoverVisible] = useState(false)
	console.log(props.page)
	let hoverLink = <div className={classes.hoverWrap}>
		<button className={classes.hoverItem}>Перейти!</button>
	</div>
	return (
		<div className={classes.cardWrap}>
			<Link to={props.page} className={classes.cardRoot}
			      onMouseEnter={() => setHoverVisible(true)}
			      onMouseLeave={() => setHoverVisible(false)}>
				<picture>
					<source srcSet={testLogo}/>
					<img alt={'TEST'} src={testLogo}/>
				</picture>
				{isHoverVisible ? hoverLink : null}
			</Link>
			<div className={classes.titleWrap}>
				<Link className={classes.title} to={props.page}>{props.header}</Link>
			</div>
		</div>
	);
};

export default Card;