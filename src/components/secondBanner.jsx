import React from 'react';
import { FaMobileAlt, FaCheckCircle, FaTags } from 'react-icons/fa';
import mobileImage from '../assets/img/sms-disfrutando-moviles.jpg';


const SecondaryBanner = () => {
  return (
    <div className='secondary-banner  col-lg-11'>
       <div className='header'>
          <h2 className="title">
            <p className='p1'>Nuestras&nbsp;</p>
          novedades
          </h2>
        <hr className="line" />
      </div>
        <section className="secondary-banner col-md-11">


        <div className="banner-layout">
          {/* Imagen lateral izquierda */}
        <div className='banner-rr rr-left'>
          <div className="banner-image-container">
            <img
            src={mobileImage}
              alt="Móvil de segunda mano"
              className="banner-image"
            />
          </div>
          </div>

          {/* Contenido textual */}        
          <div className="banner-features rr rr-right">
          <div className="banner-content">

            <div className="banner-text">
            <h2>Descubre móviles de segunda mano con calidad garantizada 
                a un precio <span className='highlight'>inmejorable</span>
            </h2>
            
          </div>
        


            <div className="features-list">
              <div className="feature-item">
                <FaCheckCircle />
                <span>Revisados y certificados</span>
              </div>
              <div className="feature-item">
                <FaTags />
                <span>Precios irresistibles</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <span>Garantía de 12 meses</span>
              </div>
              <div className="feature-item">
                <FaMobileAlt />
                <span>Envío rápido y seguro</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondaryBanner;
