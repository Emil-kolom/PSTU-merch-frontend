import React, {useState} from 'react';
import classes from "./list-item.module.css";
import ImgLink from "../ImgLink/ImgLink";

const ListItem = ({onRedirect, ...props}) => {
    /* TODO: replace it on props*/
    let [productCount,setProductCount]  = useState(1)
    const decrement = ()=>{
        if(productCount > 1){
            setProductCount(--productCount)
        }
    }
    const increment = ()=>{
        if(productCount < 1000){
            setProductCount(++productCount)
        }
    }
    return (
        <div className={classes.wrapper}>
            <ImgLink page={'/test'}
                     onClick={onRedirect}
                     style={{
                         minWidth: '200px',
                         height: 'auto'
                     }} />
            <div className={classes.descriptionWrap}>
                <p className={classes.productTitle}>{'Назва товару'}</p>
                <p>Кількість:</p>
                <div className={classes.inputNumberWrap}>
                    <button onClick={decrement}>-</button>
                    <input type={'text'} value={productCount} min={1} max={1000}/>
                    <button onClick={increment}>+</button>
                </div>
                <p className={'product-price'}>{'ціна'}</p>
                <p>{'початкова ціна * кількість = цін'}</p>
            </div>
        </div>
    );
};

export default ListItem;