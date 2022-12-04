import axios from "axios";

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