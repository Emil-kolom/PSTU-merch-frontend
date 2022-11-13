import React, {useState} from 'react';
import Card from "../components/UI/Card/Card";
import {ScrollRestoration} from "react-router-dom";

const CatalogPage = () => {
	let CategoryTitle = 'Current category'
	let [categories, setCategories] = useState(['page1',
		'page2Test'])
	return (
		<main className={'container'}>
			<h1>{CategoryTitle}:</h1>
			<div className={'cardContainer'}>
				{categories.map((category) => {
					return <Card key={category}
								 page={category}
								 header={'Header'}
								 imgPath={'/'}
					>
					</Card>
				})}
			</div>
		</main>
	);
};

export default CatalogPage;