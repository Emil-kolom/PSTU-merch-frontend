import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CatalogPage from "../pages/CatalogPage";
import ProductPage from "../pages/ProductPage";
import {useFetch} from "../hooks/useFetch";
import CategoryService from "../API/CategoryService";

{/* TODO: add ScrollRestoration https://reactrouter.com/en/6.4.2/start/tutorial#optimistic-ui*/}
const AppRouter = () => {
	let [categories, setCategories] = useState([])

	const [fetchCategory] = useFetch(async () => {
		const response = await CategoryService.getCategory();
		setCategories(response.data)
	})

	useEffect(()=>{
		fetchCategory()
	},[])
	return (
		<Routes>
			<Route path="/" element={<MainPage/>}/>
			{categories.map((category)=>{
				return <Route key={category.id}
				       path={category.url}
				element={<CatalogPage/>}/>
			})}
			{/* Product*/}
			<Route path={'/product/:id'}
				   element={<ProductPage/>}
			/>
			<Route path="*" element={
				/* replace - заменит текущую запись в стеке истории вместо добавления новой.*/
				<Navigate to="/" replace />
			} />
		</Routes>
	);
};

export default AppRouter;