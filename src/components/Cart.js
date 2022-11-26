import React, {useContext} from 'react';
import {Drawer} from "@mui/material";
import ListItem from "./UI/ListItem/ListItem";
import LeftArrow from "../img/svg/leftArrow";
import '../styles/cart.css';
import {OrderContext} from "../context/OrderContext";
import OrderService from "../service/OrderService";


const Cart = ({isDrawerOpen, setIsDrawerOpen}) => {

    const [ orders,ordersDetails,setOrders ] = useContext(OrderContext)

    function updOrderCount(){

    }

    function onItemDelete(key){
        OrderService.onDelete([orders,ordersDetails,setOrders], key)
    }

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
                {console.log(typeof orders)}
                {
                    orders.size > 0 ?
                        <h3 className={'titleCart'}>Обрані товари</h3>
                        :
                        <h3 className={'titleCart'}>Кошик порожній</h3>
                }
                {/* Картка з товаром*/}
                {
                    orders.forEach((orderCount, orderKey) => {
                        let orderKeyJSON = orderKey
                        orderKey = JSON.parse(orderKey)
                        return <ListItem key={`${orderKey.id}${orderKey.size}`}
                                         onRedirect={() => {
                                             setIsDrawerOpen(false)
                                         }}
                                         onDelete={() => {onItemDelete(orderKey)}}
                                         product={ordersDetails[orderKeyJSON]}
                                         quantityState={[orderCount, updOrderCount]}
                        />
                    })
                }

                <div className={'sumPriceWrap'}>
                    <p>Загалом:</p>
                    <p className={'sumPrice'}>{orders.forEach((count, key)=>{
                        return count * /*ordersDetails[key].price*/1
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