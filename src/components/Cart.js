import React from 'react';
import {Drawer} from "@mui/material";
import testLogo from '../img/logo.svg'
import ListItem from "./UI/ListItem/ListItem";
import LeftArrow from "../img/svg/leftArrow";
import '../styles/cart.css';


const Cart = ({isDrawerOpen, setIsDrawerOpen, ...props}) => {
    return (
        <Drawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}>
            <div className={'back'} onClick={()=>{setIsDrawerOpen(false)}}>
                <LeftArrow/>
                <h3>Повернутися до покупок</h3>
            </div>
            <h3>Обрані товари</h3>
            {/* Картка з товаром*/}
            <ListItem onRedirect={()=>{setIsDrawerOpen(false)}}/>

            <div>
                <p>Загалом:</p>
                <p>{'Ціна'}</p>
            </div>

            <button>Перейти до оформлення!</button>

        </Drawer>
    );
};

export default Cart;