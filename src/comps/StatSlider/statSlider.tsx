import React from 'react';
import './statSlider.scss';
import Slider from "react-slick";

export const StatSlider: React.FC<any> = ({items, settings}) => {

    if (!settings) {
        settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    }

    return <div className='stat-slider w-100'>
        <Slider {...settings}>
            {...items}
        </Slider>
    </div>
};