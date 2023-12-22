import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
const swiper = new Swiper();

const Carousel = ({ slides }) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      grabCursor: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    return () => {
      swiper.destroy();
    };
  }, [slides]);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {slides.map((slide, index) => (
          <div className="swiper-slide">
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev text-white"></div>
      <div className="swiper-button-next text-white"></div>

      <div className="swiper-scrollbar text-white"></div>
    </div>
  );
};

export default Carousel;
