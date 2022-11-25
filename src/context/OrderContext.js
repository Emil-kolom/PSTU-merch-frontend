import {createContext, useEffect, useState} from "react";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    let initOrders = JSON.parse(localStorage.getItem('orders'))
    if(!initOrders)
        initOrders = []
    const [orders, setOrders] = useState(initOrders);

    useEffect(()=>{
        console.log(JSON.stringify(orders))
        localStorage.setItem('orders', JSON.stringify(orders))
    },[orders])

    return (
        <OrderContext.Provider value={[orders, setOrders]}>
            {props.children}
        </OrderContext.Provider>
    );
};