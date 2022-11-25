import React, {useEffect, useState} from 'react';
import classes from "./list-item.module.css";
import ImgLink from "../ImgLink/ImgLink";

const currentNumberReg = new RegExp('^[1-9]?\\d{0,2}$');

const ListItem = ({onRedirect, onDelete, product}) => {
    const [productCount, setProductCount] = useState(product.countToBuy)
    const [inputText, setInputText] = useState(`${product.countToBuy}`)

    useEffect(()=>{
        setInputText(`${productCount}`)
        product.countToBuy = productCount
    }, [productCount])

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
        console.log(num)
        if (num) {
            setProductCount(num)
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.productImgWrap}>
                <ImgLink page={'/product/'+product.id}
                         onClick={onRedirect}
                         style={{
                             minWidth: '160px',
                             maxHeight: '150px',
                             boxSizing: 'border-box'
                         }}/>
                <button className={classes.delProd}
                        onClick={onDelete}
                >Прибрати</button>
            </div>
            <div className={classes.descriptionWrap}>
                <p className={classes.productTitle}>{product.name}</p>
                <div className={classes.sizeBlockWrap}>
                    <p>Розмір:</p>
                    <select name={'size'}>
                        {
                            product.warehouses.map((item, ind)=>{
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
                <p className={classes.productPrice}>{product.price * productCount + " Грн"}</p>
                <p className={classes.productPriceDetail}>{`${product.price} * ${productCount} =
                 ${product.price * productCount} Грн`}</p>
            </div>
        </div>
    );
};

export default ListItem;