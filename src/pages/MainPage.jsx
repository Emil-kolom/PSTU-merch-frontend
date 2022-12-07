import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import '../styles/container.css'
import '../styles/cardContainer.css'
import Card from "../components/UI/Card/Card";
import {useFetch} from "../hooks/useFetch";
import CategoryService from "../API/CategoryService";
import ProductService from "../API/ProductService";
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {OrderPlacementAlert} from "../context/OrderPlacmentAlert";
import {ImgService} from "../API/ImgService";


const MainPage = () => {
    const [categories, setCategories] = useState([])
    const [isAlertOpen_successfulOrderPlacement,
           setAlertVisible_successfulOrderPlacement] = useContext(OrderPlacementAlert)

    const [fetchCategory] = useFetch(async () => {
        const response = await CategoryService.getCategory().then(async res=>{
            let len = res.data.length
            for (let i = 0; i < len; ++i){
                let data = res.data[i]
                let imgPath = await ImgService.getImgByCategoryId(data)
                res.data[i] = {...data, imgPath: imgPath}
            }
            return res
        })
        setCategories(response.data)
    })

    useEffect(() => {
        fetchCategory()
    }, [])


    return (
        <main className={'container'}>
            <h1>Категорії товарів:</h1>
            <div className={'cardContainer'}>
                {categories.map((category) => {
                    return <Card key={category.id}
                                 page={category.url}
                                 header={category.name}
                                 imgPath={category.imgPath}
                    >
                    </Card>
                })}
            </div>
            <Snackbar open={isAlertOpen_successfulOrderPlacement}
                      autoHideDuration={6000}
                      onClose={()=>setAlertVisible_successfulOrderPlacement(false)}
            >
                <Alert severity="success"
                       onClose={()=>setAlertVisible_successfulOrderPlacement(false)}
                >
                    <AlertTitle>Вітаю!</AlertTitle>
                    Замовлення було сформовано!
                </Alert>
            </Snackbar>
        </main>
    );
};

export default MainPage;