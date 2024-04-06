import React, { memo } from 'react'
import Slider from "react-slick"
import { ProductItem } from '../../product';

const settings = {
    dots: false,
    isFinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

}
const CustomSlider = ({ products, activeTab, normal }) => {
    return (
        <>
            {
                products && <Slider className='custom-slider' {...settings}>
                    {products?.map((el, idx) => (
                        <ProductItem
                            key={idx}
                            pid={el.id}
                            productData={el}
                            isNew={activeTab === 1 ? false : true}
                            normal={normal}
                        />
                    ))}
                </Slider>
            }
        </>
    )
}

export default memo(CustomSlider)