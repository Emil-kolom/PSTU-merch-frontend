import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import '../styles/container.css'
import '../styles/cardContainer.css'
import Card from "../components/UI/Card/Card";
import {useFetch} from "../hooks/useFetch";
import CategoryService from "../API/CategoryService";
import ProductService from "../API/ProductService";


const MainPage = () => {
	let [categories, setCategories] = useState([])

	const [fetchCategory] = useFetch(async () => {
		const response = await CategoryService.getCategory();
		setCategories(response.data)
	})

	useEffect(()=>{
		fetchCategory()
	},[])
	return (
		<main className={'container'}>
			<h1>Категорії товарів:</h1>
			<div className={'cardContainer'}>
				{categories.map((category) => {
					return <Card key={category.id}
					             page={category.url}
					             header={category.name}
					             imgPath={'/'}
					>
					</Card>
				})}
			</div>
		</main>
	);
};

export default MainPage;