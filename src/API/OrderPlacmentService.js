import axios from "axios";

axios.defaults.proxy = {
    auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
    },
    protocol: 'http',
    host: 'localhost',
    port: 8080,
}

const OrderPlacementService = {
    url: '/api/order-placement',

    postOrder: async (deliveryInfo, orderList) => {
        let normalOrderList = OrderPlacementService.normalizeOrderList(orderList)
        let dataJson = JSON.stringify({...deliveryInfo, productInOrderList: normalOrderList})
        console.log(dataJson)

        return (await axios.post(OrderPlacementService.url, dataJson)).status
    },

    normalizeOrderList: (orders) => {
        let normalOrders = orders.map((order) => {
                return {
                    id: order.id,
                    size: order.size,
                    quantity: order.quantity
                }
            }
        )
        return normalOrders
    }

};

export default OrderPlacementService;