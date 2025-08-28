import React from 'react';
import bannerSamsung from "../assets/img/banner_Samsung__3087.png";
import appleBanner from "../assets/img/apple_banner.png";
import xiaomiBanner from "../assets/img/xioami.png";
//brand icons
import apple from "../assets/img/apple.png";
import  samsungIcon  from '../assets/img/Samsung.png';
import  xiaomiIcon  from '../assets/img/Xiaomi.png';

const brands = [
  {
    name: 'Samsung',
    banner: bannerSamsung,
    icon: samsungIcon,
    color: '#074F9B', // Color azul para Samsung
  },
  {
    name: 'Apple',
    banner: appleBanner,
    icon: apple,
    color: '#000000',
  },
  {
    name: 'Xiaomi',
    banner: xiaomiBanner,
    icon: xiaomiIcon,
    color: '#ED6C23', // Color naranja para Xiaomi
  },
];

const BrandsList = () => {
  return (
    <div className="brands-list-container col-lg-11">
        <div className='header'>
      <h2 className="title">
        <p className='p1'>Marcas más&nbsp;</p>
       populares
      </h2>
        <hr className="line" />
    </div>
      <div className="brands-list">
        {brands.map((brand, index) => (
          <div className="brand-card" key={index} style={{ backgroundColor: brand.color }}>
            {/* Use the brand color for the card background */}
            <img
              src={brand.banner}
              alt={brand.name}
              className="brand-image"
            />
            <div className="brand-overlay" style={{ backgroundColor: brand.color }}></div>
            {/* Overlay with the same color as the card */}
            <div className='foot-container'>
            
                <img src={brand.icon} alt={brand.name} className="brand-icon" />
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;