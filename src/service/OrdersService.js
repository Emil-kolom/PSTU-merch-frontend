import {useState} from "react";
import ProductService from "../API/ProductService";
import productService from "../API/ProductService";
import {ImgService} from "../API/ImgService";

export class OrdersService {
    static async loadImg(orderContext) {
        const [orders, setOrders] = orderContext
        let len = orders.length
        for (let i = 0; i < len; ++i) {
            let order = orders[i]
            let imgPath = (await ImgService.getImgListByDirPath(order.imgPath)).data[0].imgUrl
            OrdersService.updOrdersWithIndx([orders, setOrders], Order.updOrderVal('firstImgPath', imgPath, order), i)
        }
    }

    static async getNewProductInfo(orders) {
        let newOrder = []
        for (let i = 0; i < orders.length; ++i) {
            const response = await ProductService.getProduct(orders[i].id)
            let productInfo = response.data
            let newCurSizeInd = -1;
            productInfo.warehouses.map((inStoke, indx) => {
                if (inStoke.size === orders[i].size) {
                    newCurSizeInd = indx
                }
            })
            if (newCurSizeInd > -1) {
                newOrder.push(new Order(productInfo, newCurSizeInd))
            }
        }

        const setOrders = (prevState) => {
            newOrder = prevState(newOrder)
        }
        await OrdersService.loadImg([newOrder, setOrders])
        return newOrder
    }

    static async onAddToCart(orderContext, order) {
        const [orderList, setOrderList] = orderContext

        // if order exists
        let quantity, ind;
        orderList.map((i, indx) => {
            if (i.id === order.id &&
                i.size === order.size) {
                quantity = i.quantity
                ind = indx
            }
        })
        if (quantity) {
            order.quantity += quantity
            OrdersService.updOrdersWithIndx(orderContext, order, ind)
        } else {
            let newOrderList = [...orderList, order]
            const setOrders = (prevState) => {
                newOrderList = prevState(newOrderList)
            }
            await OrdersService.loadImg([newOrderList, setOrders])
            setOrderList(newOrderList)
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
        order.inStokeArr.map((o, indx) => {
            if (o.size === newSize) {
                newSizeInd = indx
            }
        })

        let updOrder = Order.updOrderVal('curSizeInd', newSizeInd, order);
        updOrder.quantity = order.quantity + quantity
        updOrder.size = newSize
        updOrder.price = order.inStokeArr[newSizeInd].price

        if (quantity) {
            let newOrderList = [].concat(orderList)
            newOrderList[orderIndex] = updOrder
            setOrderList(newOrderList.filter((item, ind) => ind !== existsInd));
        } else {
            OrdersService.updOrdersWithIndx(orderContext, updOrder, orderIndex)
        }
    }

    static onDeleteByInd(orderContext, index) {
        const [orders, setOrders] = orderContext;
        setOrders(orders.filter((item, ind) => ind !== index));
    }

    static updOrdersWithIndx(orderContext, order, ind) {
        const [orders, setOrders] = orderContext
        setOrders(prevOrderList=>{
            let newOrderList = [].concat(prevOrderList)
            newOrderList[ind] = order
            return newOrderList
        })
        // let newOrderList = [].concat(orders)
        // newOrderList[ind] = order
        // setOrders(newOrderList)
    }
}

export class Order {
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

    static updOrderVal(prop, val, order) {
        // let updOrder = new Order({
        //     id: order.id,
        //     warehouses: order.inStokeArr,
        //     name: order.productName,
        //     imgDirPath: order.imgPath
        // }, order.curSizeInd)
        let updOrder = {...order}
        updOrder[prop] = val
        return updOrder
    }
}
