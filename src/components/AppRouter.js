import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CatalogPage from "../pages/CatalogPage";

{/* TODO: add ScrollRestoration https://reactrouter.com/en/6.4.2/start/tutorial#optimistic-ui*/}
const AppRouter = () => {
	const [pageURL, setPageURL] = useState(['/page1', '/page2Test'])
	return (
		<Routes>
			<Route path="/" element={<MainPage/>}/>
			{pageURL.map((pathURL,i)=>{
				return <Route key={i}
				       path={pathURL}
				element={<CatalogPage/>}/>
			})}
			<Route path="*" element={
				/* replace - заменит текущую запись в стеке истории вместо добавления новой.*/
				<Navigate to="/" replace />
			} />
		</Routes>
	);
};

export default AppRouter;