import React from 'react';
import LeftArrow from "../img/svg/leftArrow";
import ListItem from "./UI/ListItem/ListItem";
import {Order, OrdersService} from "../service/OrdersService";
import {Drawer} from "@mui/material";
import '../styles/cart.css'
import NavLink from "./UI/NavLink/NavLink";

const NavListDrawer = ({isDrawerOpen, setIsDrawerOpen, navList}) => {
    return (
        <Drawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}>
            <div className={'back'} onClick={() => {
                setIsDrawerOpen(false)
            }}>
                <LeftArrow fill={'white'}/>
                <h3>Повернутися до покупок</h3>
            </div>
            <h3 className={'titleCart'}>Категорії товарів</h3>
            {/* Лист посилань*/}
            {
                navList.map(nav_link => {
                    return  <NavLink style={{width: '15em'}} key={nav_link.id} to={nav_link.url}>{nav_link.name}</NavLink>
                })
            }
        </Drawer>)}

export default NavListDrawer;