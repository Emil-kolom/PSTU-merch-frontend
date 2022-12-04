import axios from "axios";

const ProductService = {
    url: '/api/product',

    getProduct: async (id)=>{
        return axios.get(ProductService.url, {
            params:{
                id: id
            }
        })
    },

};

export default ProductService;