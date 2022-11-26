import React, {useContext, useState} from 'react';
import ProductService from "../API/ProductService";
import {OrderContext} from "../context/OrderContext";

class CartService {

    /**
     * this function is usually called to request up-to-date data about the product (in the order) by its id and size
     * @param ordersMain: type: Map; Key = {productId: int, size: str} Value - count
     * @return [ordersId, ordersDetails]: map order with: quantity and actual product Info (If the product still exists)
     * */
    static UpdateOrders(ordersMain) {
        let [ordersId, ordersDetails] = [new Map(), new Map()]
        ordersMain.forEach(async (order, key) => {
                let keyJSON = key
                key = JSON.parse(key)
                let response = await ProductService.getProduct(key.id)
                if (response.status === 200) {
                    let product = response.data
                    let needSize = product.warehouses
                        .filter((inStoke) => inStoke.size === key.size)
                    if (needSize.length > 0) {
                        ordersId.set(keyJSON, ordersMain.count)
                        product.price = product.warehouses[key.size].price
                        ordersDetails.set(keyJSON, product)
                    }
                }
            }
        )
        return [ordersId, ordersDetails]
    }

    static onAddToCart(orderContext, productInfo, curSizeInd) {
        let [ordersId, ordersDetails, setOrders] = orderContext
        const curSize = productInfo.warehouses[curSizeInd].size
        let key = {productId: productInfo.id, size: curSize}
        let keyJSON = JSON.stringify(key)
        let item = ordersId.get(keyJSON)

        if (!item) {
            item = 0
            productInfo.price = productInfo.warehouses[curSizeInd].price
            ordersDetails.set(keyJSON, productInfo)
        }

        let newOrders = new Map(ordersId)
        newOrders.set(keyJSON, item + 1)
        setOrders(newOrders)
    }

    static onDelete(orderContext, key) {
        let [ordersId, ordersDetails, setOrders] = orderContext
        let newOrders = new Map(ordersId)
        newOrders.delete(key)
        setOrders(newOrders)
        ordersDetails.delete(key)
    }
}

export default CartService;