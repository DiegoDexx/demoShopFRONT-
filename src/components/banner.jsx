import React, { useState } from 'react';
import movilesEnLaPlaya from '../assets/img/moviles_enlaplaya.jpeg';
import lastTablets from '../assets/img/las_tablets.jpeg'; // Corrige el nombre aquí
import iphone16Nieve from '../assets/img/iphone16_nieve.jpeg';
// importar iconos de flechas
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Asegúrate de instalar react-icons


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: movilesEnLaPlaya,
      text: 'Descubre las mejores ofertas de móviles de segunda mano!',
      button: 'Comprar ahora',
    },
    {
      image: lastTablets,
      text: 'Mejora tu experiencia con tabletas!',
      button: 'Explorar tabletas',
    },
    {
      image: iphone16Nieve,
      text: '¡Consigue el último iPhone 16 y más novedades!',
      button: 'Comprar iPhone 16',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="banner col-md-11">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Mueve las diapositivas
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="text-container">
              <h2>{slide.text}</h2>
              <button>{slide.button}</button>
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={prevSlide}><FaArrowLeft /></button>
        <button onClick={nextSlide}><FaArrowRight /></button>
      </div>
    </div>
  );
};

export default Banner;