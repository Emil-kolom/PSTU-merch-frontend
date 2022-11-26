import {createContext, useEffect, useState} from "react";
import OrderService from "../service/OrderService";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    let initOrders = JSON.parse(localStorage.getItem('orders'))
    let ordersDetails = new Map()
    const [isLoad, setIsLoad] = useState(false)
    let test = localStorage.getItem('orders')
    if (!test) {
        initOrders = new Map()
    } else {
                initOrders = new Map(Object.entries(JSON.parse(test)));
        [initOrders, ordersDetails]
            = OrderService.UpdateOrders(initOrders)
    }

    const [orders, setOrders] = useState(initOrders);
    // useEffect(()=>{
    //     let test = localStorage.getItem('orders')
    //     if (!test) {
    //         initOrders = new Map()
    //     } else {
    //         initOrders = new Map(Object.entries(JSON.parse(test)));
    //         [initOrders, ordersDetails]
    //             = OrderService.UpdateOrders(initOrders);
    //     }
    //     setOrders(initOrders)
    //     // setIsLoad(true)
    // },[])


    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(Object.fromEntries(orders)))
    }, [orders])

    return (
        <OrderContext.Provider value={[orders, ordersDetails, setOrders]}>
            {props.children}
        </OrderContext.Provider>
    );
};