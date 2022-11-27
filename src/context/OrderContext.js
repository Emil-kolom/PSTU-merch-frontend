import {createContext, useEffect, useState} from "react";
import {OrdersService} from "../service/OrdersService";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        let initOrders = JSON.parse(localStorage.getItem('orders'))
        if(!initOrders)
            initOrders = []
        else{
            initOrders = OrdersService.getNewProductInfo(initOrders)
        }
        setOrders(initOrders)
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