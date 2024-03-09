import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const HeroSwiper = () => {
  useEffect(() => {
    // Initialize Swiper inside the useEffect function
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",

      autoplay: {
        delay: 5000,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });

    // Destroy Swiper when the component unmounts
    return () => {
      swiper.destroy();
    };
  }, []); // The empty dependency array ensures this runs only once after component mount

  return (
    <div className="swiper absolute inset-0 h-full w-full">
        
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img
            src="https://res.cloudinary.com/duh30yscb/image/upload/v1709677557/WeddingSuitsMenDZ/y5lcecyimbskmhkq1spw.webp"
            alt="hero image"
            className=" object-cover inset-0 h-full w-full"
          />
        </div>
        <div className="swiper-slide">
          <img
            src="https://res.cloudinary.com/duh30yscb/image/upload/v1709677988/WeddingSuitsMenDZ/bjwadiwbj2lswntspkqi.jpg"

            alt="hero image"
            className=" object-cover inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};
