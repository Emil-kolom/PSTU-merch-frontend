import React, {useContext} from 'react';
import {OrderContext} from "../context/OrderContext";
import '../styles/container.css'
import TextInput from "../components/UI/Form/TextInput/TextInput";
import RedButton from "../components/UI/Button/RedButton";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@mui/material";
import MySelect from "../components/UI/Form/MySelect/MySelect";

const OrderPlacementPage = () => {
    const [orders, setOrders] = useContext(OrderContext)

    return (
        <main className={'container orderPlacementForm'}>
            <h3>Загальна сума: 12 Грн</h3>
            <h4>Введіть дані для доставки:</h4>
            <form action={'/api/order-placement'} method={'post'}>
                <TextInput value={''} name={'firstName'}>
                    Ім'я:
                </TextInput>
                <TextInput value={''} name={'firstName'}>
                    Прізвище:
                </TextInput>
                <TextInput value={''} name={'firstName'}>
                    По батькові:
                </TextInput>
                <TextInput value={''} name={'firstName'}>
                    Телефон:
                </TextInput>

                <FormControlLabel style={{marginLeft: 0}} control={<Checkbox />} labelPlacement={'start'} label="Не звонити мені (якщо все гаразд): " />

                <TextInput value={''} name={'firstName'}>
                    Email:
                </TextInput>

                {/*<MySelect>Сервіс доставки: </MySelect>*/}
                <label>Сервіс доставки: </label>
                <select>
                    <option selected>Нова пошта</option>
                    <option>Укр пошта</option>
                </select>



                <FormControlLabel style={{marginLeft: 0}} control={<Checkbox />} labelPlacement={'start'} label="Доставка на дім: " />

                <TextInput value={''} name={'firstName'}>
                    Адреса:
                </TextInput>

                <label>Коментар до замовлення: </label>
                <textarea value={''}></textarea>

                <RedButton type={'submit'}>Замовити!</RedButton>
            </form>
        </main>
    );
};

export default OrderPlacementPage;