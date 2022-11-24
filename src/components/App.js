import '../styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import React from "react";
import Header from "./Header";
import {OrderContextProvider} from "../context/OrderContext";

function App() {
    return (
        <BrowserRouter>
            <OrderContextProvider>
                <Header></Header>
                <AppRouter/>
                <Footer></Footer>
            </OrderContextProvider>
        </BrowserRouter>
    );
}

export default App;
