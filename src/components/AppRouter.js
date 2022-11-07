import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import Header from "./Header";
import Footer from "./Footer";
import CatalogPage from "../pages/CatalogPage";

const AppRouter = () => {
	const [pageURL, setPageURL] = useState(['/page1', '/page2Test'])
	return (
		<Routes>
			<Route path="/" element={<MainPage/>}/>
			{pageURL.map((pathURL,i)=>{
				return <Route key={i}
				       path={pathURL}
				element={<CatalogPage/>}></Route>
			})}
			<Route path="*" element={
				/* replace - заменит текущую запись в стеке истории вместо добавления новой.*/
				<Navigate to="/" replace />
			} />
		</Routes>
	);
};

export default AppRouter;