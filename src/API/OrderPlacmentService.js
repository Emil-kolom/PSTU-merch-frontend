import axios from "axios";

const OrderPlacementService = {
    url: '/api/order-placement',

    postOrder: async (deliveryInfo, orderList) => {
        let normalOrderList = OrderPlacementService.normalizeOrderList(orderList)
        let dataRaw = {...deliveryInfo, productInOrderList: normalOrderList}

        return await axios.post(OrderPlacementService.url, {...dataRaw})
    },

    normalizeOrderList: (orders) => {
        return orders.map((order) => {
                return {
                    id: order.id,
                    size: order.size,
                    quantity: order.quantity
                }
            }
        )
    }

};

export default OrderPlacementService;