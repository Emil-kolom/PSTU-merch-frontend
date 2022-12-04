import {useState} from "react";
import ProductService from "../API/ProductService";
import productService from "../API/ProductService";

export class OrdersService {
    static getNewProductInfo(orders){
        let newOrder = []
        orders.map((order)=>{
            const getData = async ()=> {
                const response = await ProductService.getProduct(order.id)
                let productInfo = response.data
                let newCurSizeInd = -1;
                productInfo.warehouses.map((inStoke, indx) => {
                    if (inStoke.size === order.size) {
                        newCurSizeInd = indx
                    }
                })
                if (newCurSizeInd > -1) {
                    newOrder.push(new Order(productInfo, newCurSizeInd))
                }
            }
            getData()
        })
        return newOrder
    }

    static onAddToCart(orderContext, order){
        const [orderList, setOrderList] = orderContext

        // if order exists
        let quantity, ind;
        orderList.map((i, indx)=>{
            if(i.id === order.id &&
            i.size === order.size){
                quantity = i.quantity
                ind  = indx
            }
        })
        if (quantity){
            order.quantity += quantity
            OrdersService.updOrdersWithIndx(orderContext,order, ind)
        }else{
            setOrderList([...orderList, order])
        }
    }

    static onSizeChange(orderContext, order, newSize, orderIndex) {
        const [orderList, setOrderList] = orderContext
        // if order exists
        let quantity = 0;
        let existsInd;
        orderList.map((i, indx) => {
            if (i.id === order.id &&
                i.size === newSize) {
                quantity = i.quantity
                existsInd = indx
            }
        })

        let newSizeInd;
        order.inStokeArr.map((o,indx)=>{
            if(o.size === newSize){
                newSizeInd = indx
            }
        })

        let updOrder = Order.updOrderVal('curSizeInd', newSizeInd, order);
        updOrder.quantity = order.quantity + quantity
        updOrder.size = newSize
        updOrder.price = order.inStokeArr[newSizeInd].price

        if(quantity) {
            let newOrderList = [].concat(orderList)
            newOrderList[orderIndex] = updOrder
            setOrderList(newOrderList.filter((item, ind) => ind !== existsInd));
        }else{
            OrdersService.updOrdersWithIndx(orderContext, updOrder, orderIndex)
        }
    }

    static onDeleteByInd(orderContext, index){
        const [orders, setOrders] = orderContext;
        setOrders(orders.filter((item, ind) => ind !== index));
    }

    static updOrdersWithIndx(orderContext, order, ind){
        const [orders, setOrders] = orderContext
        let newOrderList = [].concat(orders)
        newOrderList[ind] = order
        setOrders(newOrderList)
    }
}

export class Order{
    constructor(productInfo, curSizeInd) {
        this.id = productInfo.id;
        this.inStokeArr = productInfo.warehouses;
        this.size = productInfo.warehouses[curSizeInd].size
        this.price = productInfo.warehouses[curSizeInd].price
        this.curSizeInd = curSizeInd;
        this.quantity = 1;
        this.productName = productInfo.name
        this.imgPath = productInfo.imgDirPath
    }

    static updOrderVal(prop, val, order){
        let updOrder = new Order({
            id: order.id,
            warehouses: order.inStokeArr,
            name: order.productName,
            imgDirPath: order.imgPath
        }, order.curSizeInd)
        updOrder[prop] = val
        return updOrder
    }
}
