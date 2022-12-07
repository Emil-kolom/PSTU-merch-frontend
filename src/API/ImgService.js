import axios from "axios";
import CategoryService from "./CategoryService";

export const ImgService = {
    url: '/api/img/',


    getImgListByDirPath: async (dirPath) => {
        return await axios.get(ImgService.url + 'list', {
            params: {
                'dir-path': dirPath
            }
        })
    },

    getImgByCategoryId: async (category) => {
        let productList = (await CategoryService.getProductListByCategory("/" + category.url)).data
        return (await ImgService.getImgListByDirPath(productList[0].imgDirPath)).data[0].imgUrl
    }
};