import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {Drawer} from "@mui/material";
import ListItem from "./UI/ListItem/ListItem";
import LeftArrow from "../img/svg/leftArrow";
import '../styles/cart.css';
import {OrderContext} from "../context/OrderContext";
import {Order, OrdersService} from "../service/OrdersService";
import {useNavigate} from "react-router-dom";
import {ImgService} from "../API/ImgService";


const Cart = ({isDrawerOpen, setIsDrawerOpen}) => {

    const [orders, setOrders] = useContext(OrderContext)
    const navigate = useNavigate()
    let appInit = useRef(false)

    useEffect(()=>{
        if(!appInit.current){
            appInit.current = true
            return;
        }
        if(orders.length !== 0) {
            setIsDrawerOpen(true)
        }
    }, [orders])

    return (
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
                        <>
                            <h3 className={'titleCart'}>Обрані товари</h3>
                            {/* Картка з товаром*/}
                            {
                                orders.map((order, index) => {
                                    return <ListItem key={`${order.id} - ${order.size}`}
                                                     onRedirect={() => {
                                                         setIsDrawerOpen(false)
                                                     }}
                                                     onDelete={() => {
                                                         OrdersService.onDeleteByInd([orders,setOrders],index)
                                                     }}
                                                     onChangeQuantity={(newQuantity) => {
                                                         OrdersService.updOrdersWithIndx(
                                                             [orders, setOrders],
                                                             Order.updOrderVal('quantity', newQuantity, order),
                                                             index)
                                                     }}
                                                     onChangeSize={(newSize) => {
                                                         OrdersService.onSizeChange([orders, setOrders],
                                                             order,
                                                             newSize,
                                                             index)
                                                     }}
                                                     order={order}
                                    />
                                })
                            }

                            <div className={'sumPriceWrap'}>
                                <p>Загалом:</p>
                                <p className={'sumPrice'}>{orders.reduce((sum, order) => {
                                    return sum + order.quantity * order.price
                                }, 0) + " Грн"}</p>
                            </div>
                            <div className={'flexCenter'}>
                                <button id={'checkoutButton'}
                                        onClick={()=>{
                                            navigate('/order-placement')
                                        }}
                                >Перейти до оформлення!</button>
                            </div>
                        </>
                        :
                        <h3 className={'titleCart'}>Кошик порожній</h3>
                }
            </Drawer>
    );
};

export default Cart;