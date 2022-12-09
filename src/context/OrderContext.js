import {createContext, useEffect, useRef, useState} from "react";
import {Order, OrdersService} from "../service/OrdersService";
import {ImgService} from "../API/ImgService";

export const OrderContext = createContext();
export const OrderLoadContext = createContext();

export const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([]);
    const [isOrderLoad, setOrderLoad] = useState(false)
    const appInit = useRef(false);

    useEffect(() => {
        let initOrders = JSON.parse(localStorage.getItem('orders'))
        if (!initOrders) {
            setOrders([])
        } else {
            OrdersService.getNewProductInfo(initOrders).then(res => {
                setOrders(res)
            }).catch(reason => {
                setOrders([])
            })
        }
        setOrderLoad(true)
    }, [])

    useEffect(() => {
        if (!appInit.current) {
            appInit.current = true
            return
        }
        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])

    return (
        <OrderContext.Provider value={[orders, setOrders]}>
            <OrderLoadContext.Provider value={isOrderLoad}>
                {props.children}
            </OrderLoadContext.Provider>
        </OrderContext.Provider>
    )
};