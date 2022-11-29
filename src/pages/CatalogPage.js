import React, {useEffect, useState} from 'react';
import Card from "../components/UI/Card/Card";
import {useLocation, useNavigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";
import CategoryService from "../API/CategoryService";

const CatalogPage = () => {
    let [productList, setProductList] = useState([])
    const location = useLocation();
    const [currentCategory, setCurrentCategory] = useState({});
    const [isLoading2, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const [fetchCategory] = useFetch(async () => {
        const productList = await CategoryService.getProductListByCategory(location.pathname);
        const currentCategoryRes = await CategoryService.getCategoryByUrl(location.pathname)
        setProductList(productList.data)
        setCurrentCategory(currentCategoryRes.data)
        setIsLoading(true)
    }, navigate)

    useEffect(() => {
        fetchCategory()
    }, [])


    return (
        isLoading2 ?
            <main className={'container'}>
                <h1>{currentCategory.name}:</h1>
                <div className={'cardContainer'}>
                    {productList.map((product) => {
                        return <Card key={product.id}
                                     page={`/product/${product.id}`}
                                     header={product.name}
                                     imgPath={'/'}
                        >
                        </Card>
                    })}
                </div>
            </main> :
            null
    );
};

export default CatalogPage;