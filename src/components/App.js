import '../styles/App.css';
import {BrowserRouter, ScrollRestoration} from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import React from "react";
import Header from "./Header";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <AppRouter/>
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;
