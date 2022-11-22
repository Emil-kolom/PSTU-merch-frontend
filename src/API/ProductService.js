import axios from "axios";

// axios.defaults.proxy.hostname = '127.0.0.1'
axios.defaults.proxy = {
    protocol: 'http',
    host: 'localhost',
    // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
    port: 8080,
    auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
    }
}

const ProductService = {
    url: '/api/product',

    getProduct: async (id)=>{
        const response = await axios.get(ProductService.url, {
            params:{
                id: id
            },
            proxy:{
                protocol: 'http',
                host: '127.0.0.1',
                // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
                port: 8080,
                auth: {
                    username: 'mikeymike',
                    password: 'rapunz3l'
                }
            }
        })
        console.log(`status = ${response.status}`)
        return response.data
    },

};

export default ProductService;