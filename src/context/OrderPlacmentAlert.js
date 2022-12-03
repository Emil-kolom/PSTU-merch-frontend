import {createContext, useEffect, useState} from "react";


export const OrderPlacementAlert = createContext();

export const OrderPlacementAlertProvider = (props) => {
    const [isAlertVisible, setAlertVisible] = useState(false);

    return (
        <OrderPlacementAlert.Provider value={[isAlertVisible, setAlertVisible]}>
            {props.children}
        </OrderPlacementAlert.Provider>
    );
};