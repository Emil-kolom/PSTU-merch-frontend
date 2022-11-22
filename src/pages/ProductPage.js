import React, {useEffect, useState} from 'react';
import '../styles/container.css'
import {useParams} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import LeftArrow from "../img/svg/leftArrow";
import ProductService from "../API/ProductService";
import '../styles/productPage.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";

const ProductPage = () => {
    let urlParams = useParams()
    let [imgSetPath, setImgSetPath] = useState(['/img/caps/1.png', '/logo192.png'])
    let [productInfo, setProductInfo] = useState({
        title: 'Test Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam distinctio dolorem et eum, expedita explicabo facere ipsam, modi nobis nostrum saepe sed sint soluta totam unde ut vel voluptatibus.',
        inStock: {
            price: [1],
            clothesSizes: [1, 2]
        }
    })
    let [currentSize, setCurrentSize] = useState(0)

    useEffect(()=>{
        // setProductInfo(ProductService.getProduct(2))
        console.log(` serv ${ProductService.getProduct(2)}`)
    },[])

    return (
        <main className={'container'}>
            <h1>{productInfo.title}</h1>
           <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            >
               {
               imgSetPath.map((imgPath, i) => {
                   return <SwiperSlide key={i}><img src={imgPath}
                               alt={'picture-'+i}/>
                   </SwiperSlide>
               })}
        </Swiper>
            {productInfo.inStock.clothesSizes.length > 0 ?
                <span className={'price'}>{productInfo.inStock.price[currentSize] + ' Грн'}</span>
                :
                <span>Товару немає в наявності</span>
            }
            {
                productInfo.inStock.clothesSizes.length > 0 ?
                    <div className={'sizeBlockWrap'}>
                        <h3>Size:</h3>
                        {productInfo.inStock.clothesSizes.map((sizeValue, id) => {
                            return <React.Fragment>
                                <input type={'radio'}
                                       name={'size'}
                                       value={sizeValue}
                                       id={sizeValue + '-size'}
                                       key={id}
                                    defaultChecked={id === 0}
                                />
                                <label htmlFor={sizeValue + '-size'}>{sizeValue}</label>
                            </React.Fragment>
                        })
                        }
                    </div>
                    :
                    null
            }
            <p className={'productDescription'}>{productInfo.description}</p>
        </main>
    );
};

export default ProductPage;