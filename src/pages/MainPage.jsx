import React, {useState} from 'react';
import Header from "../components/Header";
import '../styles/container.css'
import '../styles/cardContainer.css'
import Card from "../components/UI/Card/Card";


const MainPage = () => {
	let [categories, setCategories] = useState(['page1',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page3',
		'page2Test'])
	return (
		<main className={'container'}>
			<h1>Категорії товарів:</h1>
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

export default MainPage;