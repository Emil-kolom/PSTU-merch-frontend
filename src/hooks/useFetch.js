import {useEffect, useState} from 'react';

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
            errorNav('/')
        }
    }, [status])

    return [setData]
}