import React, {useEffect, useState} from 'react';
import '../styles/header.css'
import '../styles/container.css'
import logo from '../img/PSTU-logo-300x281.png'
import {Button, Drawer, IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";
import Cart from "./Cart";
import NavLink from "./UI/NavLink/NavLink";
import {A11y, Autoplay, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import RedButton from "./UI/Button/RedButton";
import BlueButton from "./UI/Button/BlueButton";
import NavListDrawer from "./navListDrawer";

const Header = () => {
    let [navList, setNavList] = useState([])
    useEffect(() => {
        //GET from fetch
        setNavList([
            {name: 'link 1 TEST', link: '/cot', id: 1},
            {name: 'link 2', link: '/cot', id: 2},
            {name: 'link 2', link: '/cot', id: 5},
            {name: 'link 2', link: '/cot', id: 6},
            {name: 'link 2', link: '/cot', id: 7},
            {name: 'link 2', link: '/cot', id: 8},
            {name: 'link 3', link: '/cot3', id: 3}])
    }, [])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false)

    const navigate = useNavigate()

    return (
        <header>
            <div className={'header container'}>
                <div id={'title-block'} onClick={() => {
                    navigate('/')
                }}>
                    <div className={'logoWrap'}>
                        <img className={'logo'} src={logo} alt={'PSTU-logo'}/>
                    </div>
                    <h3 id={'title'}>PSTU Merch</h3>
                </div>
                <RedButton appendClass={'navButton'}  onClick={() => {
                    setIsTopDrawerOpen(true)
                }}>Навігація ≡</RedButton>
                <NavListDrawer setIsDrawerOpen={setIsTopDrawerOpen} isDrawerOpen={isTopDrawerOpen} navList={navList}/>
                {/*Корзина*/}
                <IconButton
                    onClick={() => setIsDrawerOpen(true)}>
                    <ShoppingCartIcon sx={{color: '#f5f5f5'}}></ShoppingCartIcon>
                </IconButton>
                <Cart isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
            </div>
        </header>
    );
};

export default Header;