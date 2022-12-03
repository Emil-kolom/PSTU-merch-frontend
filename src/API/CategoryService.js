import axios from "axios";

axios.defaults.proxy = {
    auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
    }
}

const CategoryService = {
    url: '/api/category',

    getCategory: async ()=>{
        return axios.get(CategoryService.url)
    },

    getProductListByCategory: async (categoryUrl)=>{
        return axios.get(CategoryService.url+categoryUrl)
    },

    getCategoryByUrl: async(categoryUrl)=>{
        return axios.get(CategoryService.url+'/info',{
            params:{
                path: categoryUrl.slice(1)
            }})
    }
};

export default CategoryService;