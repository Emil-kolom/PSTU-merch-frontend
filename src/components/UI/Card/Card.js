import React, {useState} from 'react';
import classes from './card.module.css'
import {Link} from "react-router-dom";
import testLogo from '../../../img/logo.svg'
import ImgLink from "../ImgLink/ImgLink";

const Card = (props) => {

	const setPrice = (price)=>{
		let res = price
		if(typeof price !== 'string'){
			res = "Від "+ res + ' Грн'
		}
		return res
	}

	return (
		<div className={classes.cardWrap}>
			<ImgLink page={props.page} MainImg={props.imgPath}/>
			{props.price?
				<div className={classes.price}>{setPrice(props.price)}</div>:
				null
			}
			<div className={classes.titleWrap}>
				<Link className={classes.title} to={props.page}>{props.header}</Link>
			</div>
		</div>
	);
};

export default Card;