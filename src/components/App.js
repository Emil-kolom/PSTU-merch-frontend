import '../styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import React from "react";
import Header from "./Header";
import {OrderContextProvider} from "../context/OrderContext";
import {OrderPlacementAlertProvider} from "../context/OrderPlacmentAlert";

function App() {
    return (
        <BrowserRouter>
            <OrderContextProvider>
                <Header></Header>
                <OrderPlacementAlertProvider>
                    <AppRouter/>
                </OrderPlacementAlertProvider>
                <Footer></Footer>
            </OrderContextProvider>
        </BrowserRouter>
    );
}

export default App;
