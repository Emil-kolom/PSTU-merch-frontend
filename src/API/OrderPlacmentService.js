import axios from "axios";

const OrderPlacementService = {
    url: 'http://localhost:8080/api/order-placement',

    postOrder:  async (deliveryInfo, orderList) => {
        let normalOrderList = OrderPlacementService.normalizeOrderList(orderList)
        let dataRaw = {...deliveryInfo, productInOrderList: normalOrderList}

        return await axios.post(OrderPlacementService.url, {...dataRaw})
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