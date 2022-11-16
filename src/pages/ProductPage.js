import React, {useState} from 'react';
import '../styles/container.css'
import {useParams} from "react-router-dom";
import Carousel from "nuka-carousel";
import '../styles/productPage.css'
import LeftArrow from "../img/svg/leftArrow";

const ProductPage = () => {
    let urlParams = useParams()
    let [imgSetPath, setImgSetPath] = useState(['/logo192.png', '/logo192.png'])
    let [productInfo, setProductInfo] = useState({
        title: 'Test Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam distinctio dolorem et eum, expedita explicabo facere ipsam, modi nobis nostrum saepe sed sint soluta totam unde ut vel voluptatibus.',
        inStock: {
            price: [1],
            clothesSizes: [1]
        }
    })
    let [currentSize, setCurrentSize] = useState(0)


    return (
        <main className={'container'}>
            <h1>{productInfo.title}</h1>
            <div className={'carouselWrap'}>
                <div className={'carousel'}>
                    <Carousel wrapAround={true}
                              className={'slide'}
                              renderCenterLeftControls={({previousDisabled, previousSlide}) => (
                                  <LeftArrow onClick={previousSlide} disabled={previousDisabled}/>
                              )}
                              renderCenterRightControls={({nextDisabled, nextSlide}) => (
                                  <LeftArrow onClick={nextSlide} disabled={nextDisabled}
                                             style={{transform: 'scaleX(-1)'}}/>
                              )}
                    >
                        {
                            imgSetPath.map((imgPath, i) => {
                                return <img style={{userSelect: 'none'}} src={process.env.PUBLIC_URL + imgPath}
                                            alt={imgPath} key={i}/>
                            })
                        }
                    </Carousel>
                </div>
            </div>
            {productInfo.inStock.clothesSizes.length > 0 ?
                <span className={'price'}>{productInfo.inStock.price[currentSize] + ' Грн'}</span>
                :
                <span>Товару немає в наявності</span>
            }
            {
                productInfo.inStock.clothesSizes.length > 0 ?
                    <div>
                        <h3>Size:</h3>
                        {productInfo.inStock.clothesSizes.map((sizeValue, id) => {
                            return <div>
                                <input type={'radio'} name={'size'} value={'sizeValue'} id={sizeValue + '-size'} key={id}/>
                                <label htmlFor={sizeValue + '-size'}>{sizeValue}</label>
                            </div>
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