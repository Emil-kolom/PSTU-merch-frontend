import React, {useState} from 'react';
import classes from "./list-item.module.css";
import ImgLink from "../ImgLink/ImgLink";

const currentNumberReg = new RegExp('^[1-9]?\\d{0,2}$');

const ListItem = ({onRedirect,onDelete, ...props}) => {
    /* TODO: replace it on props*/
    let [productCount,setProductCount]  = useState(1)
    let [inputText, setInputText] = useState('1')
    const decrement = ()=>{
        if(productCount > 1){
            setProductCount(--productCount)
            setInputText(`${productCount}`)
        }
    }
    const increment = ()=>{
        if(productCount < 1000){
            setProductCount(++productCount)
            setInputText(`${productCount}`)
        }
    }

    function changeInputPrice(e) {
        let num = e.target.value
        if(currentNumberReg.test(num)){
            setInputText(num)
        }
    }

    function changePrice(e) {
        let num = parseInt(e.target.value)
        console.log(num)
        if(num){
            setProductCount(num)
            setInputText(`${num}`)
        }else {
            setInputText(`${productCount}`)
        }
    }

    return (
        <div className={classes.wrapper}>
            <ImgLink page={'/test'}
                     onClick={onRedirect}
                     style={{
                         minWidth: '160px',
                         maxHeight: '150px'
                     }} />
            <div className={classes.descriptionWrap}>
                <p className={classes.productTitle}>{'Назва товару'}</p>
                <button className={classes.delProd}
                        onClick={onDelete}
                >Прибрати</button>
                <div className={classes.sizeBlockWrap}>
                    <p>Розмір:</p>
                    <input type={"radio"} value={'S'} id={'S'} name={'size'}/>
                    <label htmlFor="S">S</label>
                    <input type={"radio"} value={'SX'} id={'SX'} name={'size'}/>
                    <label htmlFor="SX">SX</label>
                </div>
                <p className={classes.productPrice}>{'ціна'}</p>
                <p className={classes.productPriceDetail}>{`початкова ціна * ${productCount} = ціна`}</p>
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
             </div>
        </div>
    );
};

export default ListItem;