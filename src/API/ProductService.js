import axios from "axios";

axios.defaults.proxy = {
    auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
    }
}

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