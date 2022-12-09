import {createContext, useEffect, useState} from "react";
import {Order, OrdersService} from "../service/OrdersService";
import {ImgService} from "../API/ImgService";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        let initOrders = JSON.parse(localStorage.getItem('orders'))
        if(!initOrders)
            setOrders([])
        else{
            OrdersService.getNewProductInfo(initOrders).then(res=>{
                setOrders(res)
            }).catch(reason=>{
                setOrders([])
            })
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('orders', JSON.stringify(orders))
    },[orders])

    return (
        <OrderContext.Provider value={[orders, setOrders]}>
            {props.children}
        </OrderContext.Provider>
    );
};