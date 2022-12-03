import React, {useContext, useEffect, useRef, useState} from 'react';
import {OrderContext} from "../context/OrderContext";
import '../styles/container.css'
import TextInput from "../components/UI/Form/TextInput/TextInput";
import RedButton from "../components/UI/Button/RedButton";
import {Alert, AlertTitle, Checkbox, FormControlLabel, Snackbar} from "@mui/material";
import MySelect from "../components/UI/Form/MySelect/MySelect";
import MyTextarea from "../components/UI/Form/MyTextarea/MyTextarea";
import {OrderPlacementAlert} from "../context/OrderPlacmentAlert";
import {useNavigate} from "react-router-dom";
import OrderPlacementService from "../API/OrderPlacmentService";
import {useFetch} from "../hooks/useFetch";
import CategoryService from "../API/CategoryService";

const OrderPlacementPage = () => {
    const [orders, setOrders] = useContext(OrderContext)
    const navigate = useNavigate()
    const [, setSuccessAlertVisible] = useContext(OrderPlacementAlert)
    const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false)

    const [clientInfo, setClientInfo] = useState({
        firstName: '',
        secondName: '',
        middleName: '',
        phoneNumber: '',
        needCall: false,
        homeDelivery: false,
        deliveryCompany: '',
        email: '',
        address: '',
        note: ''
    })

    const onChangeClientInfo = (e, propStr) => {
        setClientInfo(prevState => {
            let newClientInfo = {...prevState};
            if (typeof newClientInfo[propStr] === 'boolean') {
                newClientInfo[propStr] = e.target.checked
            } else {
                newClientInfo[propStr] = e.target.value;
            }
            return newClientInfo;
        })
    }

    const [deliveryServiceTitle, ] = useState(
        ['Нова пошта', "Укр пошта"])

    useEffect(()=>{
        let e = {target: {value: deliveryServiceTitle[0]}}
        onChangeClientInfo(e,'deliveryCompany')
    }, [deliveryServiceTitle])

    useEffect(()=>{
        if(orders.length == 0){
            navigate('/')
        }
    }, [orders])


    const onSubmit = (e)=>{
        e.preventDefault()
        OrderPlacementService.postOrder(clientInfo, orders).then(res=>{
            let resCode=res.status
            if(resCode === 200) {
                setOrders([])
                navigate('/')
                setSuccessAlertVisible(true)
            }else {
                setIsErrorAlertVisible(true)
            }
        })
    }

    return (
        <main className={'container orderPlacementForm'}>
            <h2>Загальна сума: 12 Грн</h2>
            <h3>Введіть дані для доставки:</h3>
            <form onSubmit={onSubmit}>
                <TextInput value={clientInfo.firstName}
                           onChange={(e) => onChangeClientInfo(e, 'firstName')}
                           required
                >
                    Ім'я:
                </TextInput>
                <TextInput value={clientInfo.secondName}
                           onChange={(e) => onChangeClientInfo(e, 'secondName')}
                           required
                >
                    Прізвище:
                </TextInput>
                <TextInput value={clientInfo.middleName}
                           onChange={(e) => onChangeClientInfo(e, 'middleName')}>
                    По батькові:
                </TextInput>
                <TextInput type={'tel'}
                           value={clientInfo.phoneNumber}
                           onChange={(e) => onChangeClientInfo(e, 'phoneNumber')}
                           required
                           pattern="^[\+]?[\d]{5,15}$"
                >
                    Телефон:
                </TextInput>

                <FormControlLabel style={{marginLeft: 0}}
                                  control={<Checkbox
                                      value={clientInfo.isNeedCall}
                                      onChange={(e) => onChangeClientInfo(e, 'isNeedCall')}
                                  />}
                                  labelPlacement={'start'}
                                  label="Не звонити мені (якщо все гаразд): "
                />

                <TextInput
                    value={clientInfo.email}
                    onChange={(e) => onChangeClientInfo(e, 'email')}
                >
                    Email:
                </TextInput>

                <MySelect
                    value={clientInfo.deliveryCompany}
                    onChange={(e) => onChangeClientInfo(e, 'deliveryCompany')}
                    selectOption={deliveryServiceTitle}
                >Сервіс доставки: </MySelect>
                <FormControlLabel style={{marginLeft: 0}}
                                  control={<Checkbox
                                      value={clientInfo.homeDelivery}
                                      onChange={(e) => onChangeClientInfo(e, 'homeDelivery')}
                                  />}
                                  labelPlacement={'start'}
                                  label="Доставка на дім: "/>

                <TextInput
                    value={clientInfo.address}
                    onChange={(e) => onChangeClientInfo(e, 'address')}
                    required
                >
                    Адреса:
                </TextInput>

                <MyTextarea
                    value={clientInfo.note}
                    onChange={(e) => onChangeClientInfo(e, 'note')}
                    maxLength={200}
                >
                    Коментар до замовлення:
                </MyTextarea>

                <RedButton style={{marginTop: 5}} type={'submit'}>Замовити!</RedButton>
            </form>

            <Snackbar open={isErrorAlertVisible}
                      autoHideDuration={6000}
                      onClose={()=>setIsErrorAlertVisible(false)}
            >
                <Alert severity="error"
                       onClose={()=>setIsErrorAlertVisible(false)}
                >
                    <AlertTitle>Помилка(</AlertTitle>
                    Вибачте, але щось пішло не так, будьласка спробуйте пізніше, або напишіть у службу підтримки.
                </Alert>
            </Snackbar>
        </main>
    );
};

export default OrderPlacementPage;