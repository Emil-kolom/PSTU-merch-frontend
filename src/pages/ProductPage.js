import React, {useContext, useEffect, useState} from 'react';
import '../styles/container.css'
import {redirect, useNavigate, useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import LeftArrow from "../img/svg/leftArrow";
import ProductService from "../API/ProductService";
import '../styles/productPage.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import {useFetch} from "../hooks/useFetch";
import {OrderContext} from "../context/OrderContext";

const ProductPage = () => {
    let urlParams = useParams()
    let [imgSetPath, setImgSetPath] = useState(['/img/caps/1.png', '/logo192.png'])
    let [productInfo, setProductInfo] = useState()
    let [currentSize, setCurrentSize] = useState(0)
    let [isLoading, setLoading] = useState(false)
    let navigate = useNavigate()

    const [fetchProductById] = useFetch(async (id) => {
        const response = await ProductService.getProduct(urlParams.id);
        console.log(response)
        setProductInfo(response.data)
        setLoading(true)
    }, navigate)

    useEffect(() => {
        fetchProductById()
    }, [])


    const [orders, setOrders] = useContext(OrderContext)
    function onAddToCart() {
        let [item] = orders.filter((i)=>i.id === productInfo.id &&
            i.sizeToBuy === productInfo.warehouses[currentSize].size)
        if(item){
            item.countToBuy += 1
        }else {
            item = productInfo;
            item.countToBuy = 1
            item.sizeToBuy = productInfo.warehouses[currentSize].size
            item.price = productInfo.warehouses[currentSize].price
            setOrders([...orders, productInfo])
        }
    }

    return (
        isLoading ?
            <main className={'container'}>
                <h1>{productInfo.title}</h1>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    navigation
                    pagination={{clickable: true}}
                >
                    {
                        imgSetPath.map((imgPath, i) => {
                            return <SwiperSlide key={i}><img src={imgPath}
                                                             alt={'picture-' + i}/>
                            </SwiperSlide>
                        })}
                </Swiper>
                {productInfo.warehouses.length > 0 ?
                    <div className={'priceBlock'}>
                        <span className={'price'}>{productInfo.warehouses[currentSize].price + ' Грн'}</span>
                        <button className={'buyButton'} onClick={onAddToCart}>Купити!</button>
                    </div>
                    :
                    <span>Товару немає в наявності</span>
                }
                {
                    productInfo.warehouses.length > 0 ?
                        <div className={'sizeBlockWrap'}>
                            <h3>Size:</h3>
                            {productInfo.warehouses.map((inStoke, id) => {
                                return <React.Fragment key={id}>
                                    <input type={'radio'}
                                           name={'size'}
                                           value={inStoke.size}
                                           id={inStoke.size + '-size'}
                                           defaultChecked={id === 0}
                                    />
                                    <label htmlFor={inStoke.size + '-size'}
                                           onClick={() => setCurrentSize(id)}>{inStoke.size}</label>
                                </React.Fragment>
                            })
                            }
                        </div>
                        :
                        null
                }
                <p className={'productDescription'}>{productInfo.description}</p>
            </main>
            : null
    );
};

export default ProductPage;