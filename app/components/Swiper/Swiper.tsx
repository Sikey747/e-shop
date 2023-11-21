"use client"

import Banner from './../Banner/Banner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y,Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/autoplay";


export default function Swipers({}){
    return(
        <Swiper
        spaceBetween={50}
        modules={[Navigation, Pagination, A11y,Autoplay]}
        navigation
        autoplay
        pagination={{ clickable: true }}
        loop
      >
        <SwiperSlide><Banner proc={50}/></SwiperSlide>
        <SwiperSlide><Banner proc={80}/></SwiperSlide>
        <SwiperSlide><Banner proc={15}/></SwiperSlide>
        <SwiperSlide><Banner proc={25}/></SwiperSlide>
      </Swiper>
    )
}