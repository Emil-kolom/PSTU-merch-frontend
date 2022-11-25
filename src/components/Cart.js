import React, {useContext} from 'react';
import {Drawer} from "@mui/material";
import ListItem from "./UI/ListItem/ListItem";
import LeftArrow from "../img/svg/leftArrow";
import '../styles/cart.css';
import {OrderContext} from "../context/OrderContext";


const Cart = ({isDrawerOpen, setIsDrawerOpen}) => {

    const [ orders,setOrders ] = useContext(OrderContext)

    return (
        <OrderContext.Provider value={orders}>
            <Drawer
                anchor={"right"}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}>
                <div className={'back'} onClick={() => {
                    setIsDrawerOpen(false)
                }}>
                    <LeftArrow fill={'white'}/>
                    <h3>Повернутися до покупок</h3>
                </div>
                {
                    orders.length > 0 ?
                        <h3 className={'titleCart'}>Обрані товари</h3>
                        :
                        <h3 className={'titleCart'}>Кошик порожній</h3>
                }
                {/* Картка з товаром*/}
                {
                    orders.map((productInfo, index) => {
                        return <ListItem key={productInfo.id}
                                         onRedirect={() => {
                                             setIsDrawerOpen(false)
                                         }}
                                         onDelete={() => {
                                             setOrders(orders.filter((item, ind) => ind !== index))
                                             console.log(orders)
                                         }}
                                         product={productInfo}
                        />
                    })
                }

                <div className={'sumPriceWrap'}>
                    <p>Загалом:</p>
                    <p className={'sumPrice'}>{orders.reduce((sum, product)=>{
                        return sum + product.countToBuy * product.price
                    },0) + " Грн"}</p>
                </div>

                <div className={'flexCenter'}>
                    <button id={'checkoutButton'}>Перейти до оформлення!</button>
                </div>

            </Drawer>
        </OrderContext.Provider>
    );
};

export default Cart;