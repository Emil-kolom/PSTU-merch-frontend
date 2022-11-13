import React from 'react';
import classes from "./list-item.module.css";
import testLogo from "../../../img/logo.svg";
import ImgLink from "../ImgLink/ImgLink";

const ListItem = ({onRedirect, ...props}) => {
    return (
        <div className={classes.wrapper}>
            <ImgLink page={'/test'} onClick={onRedirect}/>
            {/*<img className={classes.productImg} src={testLogo} alt={'*Назва товару* - вид'}></img>*/}
            <div className={classes.descriptionWrap}>
                <p className={'product-title'}>{'Назва товару'}</p>
                <p>Кількість:</p>
                <div>
                    <button>-</button>
                    <input type={'number'}/>
                    <button>+</button>
                </div>
                <p className={'product-price'}>{'ціна'}</p>
                <p>{'початкова ціна * кількість = цін'}</p>
            </div>
        </div>
    );
};

export default ListItem;