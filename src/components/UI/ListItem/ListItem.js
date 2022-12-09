import React, {useEffect, useRef, useState} from 'react';
import classes from "./list-item.module.css";
import ImgLink from "../ImgLink/ImgLink";

const currentNumberReg = new RegExp('^[1-9]?\\d{0,2}$');

const ListItem = ({onRedirect, onDelete, onChangeQuantity, onChangeSize, order}) => {
    const [productCount, setProductCount] = useState(order.quantity)
    const [inputText, setInputText] = useState(`${order.quantity}`)
    const [curSizeSelect, setCurSizeSelect ] = useState(order.size)
    const appInit = useRef(false)

    useEffect(()=>{
        setInputText(`${productCount}`)
        onChangeQuantity(productCount)
    }, [productCount])

    useEffect(()=>{
        if(!appInit.current){
            appInit.current = true
            return
        }
        setProductCount(order.quantity)
    },[order])

    const decrement = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1)
        }
    }
    const increment = () => {
        if (productCount < 1000) {
            setProductCount(productCount + 1)
        }
    }

    function changeInputPrice(e) {
        let num = e.target.value
        if (currentNumberReg.test(num)) {
            setInputText(num)
        }
    }

    function changePrice(e) {
        let num = parseInt(e.target.value)
        if (num) {
            setProductCount(num)
        }else {
            setInputText(`${productCount}`)
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.productImgWrap}>
                <ImgLink page={'/product/'+order.id}
                         onClick={onRedirect}
                         style={{
                             minWidth: '160px',
                             maxHeight: '150px',
                             boxSizing: 'border-box'
                         }}
                         MainImg={order.firstImgPath}
                />
                <button className={classes.delProd}
                        onClick={onDelete}
                >Прибрати</button>
            </div>
            <div className={classes.descriptionWrap}>
                <p className={classes.productTitle}>{order.name}</p>
                <div className={classes.sizeBlockWrap}>
                    <p>Розмір:</p>
                    <select name={'size'}
                            value={curSizeSelect}
                            onChange={(e)=>{
                                setCurSizeSelect(e.target.value)
                                onChangeSize(e.target.value)
                    }}>
                        {
                            order.inStokeArr.map((item, ind)=>{
                                return <option value={item.size} key={ind}>{item.size}</option>
                            })
                        }
                    </select>
                </div>
                <p>Кількість:</p>
                <div className={classes.inputNumberWrap}>
                    <button onClick={decrement}>-</button>
                    <input type={'number'}
                           value={inputText}
                           onChange={changeInputPrice}
                           onBlur={changePrice}
                    />
                    <button onClick={increment}>+</button>
                </div>
                <p className={classes.productPrice}>{order.price * order.quantity + " Грн"}</p>
                <p className={classes.productPriceDetail}>{`${order.price} * ${order.quantity} =
                 ${order.price * order.quantity} Грн`}</p>
            </div>
        </div>
    );
};

export default ListItem;