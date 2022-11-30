import React, {useEffect, useState} from 'react';
import ProductService from "../API/ProductService";
import {useNavigate} from "react-router-dom";

export const useFetch = (callback, errorNav) => {
    let [status, setStatus] = useState()


    let setData = async (...args) => {
        try {
            let res = await callback(...args)
            setStatus(res.status)
        }
        catch(e){
            if (e.response) {
                setStatus(e.response.status)
            }
        }
    }

    useEffect(() => {
        if (status && status !== 200) {
            if(typeof errorNav !== 'undefined')
                errorNav('/')
        }
    }, [status])

    return [setData]
}