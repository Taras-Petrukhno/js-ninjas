import React, { useState, useRef } from 'react'
// style
import '../styles/components/Slider.scss'
// Components
import Pagination from './Pagination';
import styles from '../styles/components/PaginationSlider.module.scss'


export default function Slider({ images, slideController }) {
    const isDeleteSlideOption = !!slideController?.deleteSlideHandler;
    const trackEl = useRef(null);
    const [slider, setSlider] = useState(() => {
        if (images.length) {
            const slides = images.map((ep, i) => {
                return {
                    ep: ep,
                    url: process.env.REACT_APP_API_URL + ep,
                    order: i + 1,
                };
            })
            const slidesNumber = images.length;
            const currentSlide = slides[0];

            return { currentSlide, slidesNumber, slides }
        }
        return { currentSlide: null, slidesNumber: null, slides: [] };

    });

    function openSlideHandler(slideNum) {
        if (!slideNum) return;
        const slide = slider.slides.find((item) => {
            return item.order === slideNum;
        });
        if (slide) setSlider({ ...slider, currentSlide: slide });

        const slideWidth = trackEl.current.firstChild.offsetWidth;
        const order = slideNum;
        trackEl.current.style.transform = `translateX(${(order - 1) * -slideWidth}px)`;
    }

    function deleteSlideHandler(e) {
        slideController.deleteSlideHandler(slider)
        let slides = slider.slides.filter((slide) => slide.ep !== slider.currentSlide.ep);
        slides.forEach((_, i, arr) => {
            arr[i].order = i + 1;
        })
        let currentSlide = slides.length ? slides[0] : null;
        openSlideHandler(currentSlide?.order)
        setSlider({ ...slider, slides, currentSlide, slidesNumber: slider.slidesNumber - 1 })
    }

    return (
        <div className='slider'>
            <div className="slider__screen">
                <div className="slider__track" ref={trackEl}>
                    {slider.slides.map((slide) => {
                        return (
                            <div key={slide.ep} className="slider__slide" data-order={slide.order}>
                                {isDeleteSlideOption &&
                                    <div className="slider__slide-controller">
                                        <div className="slider__slide-btn" onClick={deleteSlideHandler}>delete</div>
                                    </div>}
                                <img className='slider__img' src={slide.url} alt="superhero image" />
                            </div>
                        )
                    })}
                </div>
                {<Pagination pageCount={slider.slidesNumber} currentPage={slider.currentSlide?.order} styles={styles} handler={(e) => { openSlideHandler(+e.target.dataset.num) }} />}
            </div>
        </div>
    )
}
