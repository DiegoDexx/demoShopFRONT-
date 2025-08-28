import React from "react";

import iphone16 from "../assets/img/apple2.png"; // ejemplo, asegúrate de tener la imagen

const ProductBanner = () => {
  return (
    <section className="product-banner col-lg-11">
      <div className="banner-content">
        <div className="banner-text">
          <h2>
            Redescubre la potencia del <strong className="highlight">iPhone 16</strong> con garantía y
            al mejor precio. 
            </h2>
            <p>
               Reacondicionado, libre y en perfecto estado para
              que disfrutes como si fuera nuevo.
            </p>
          <button className="cta-btn">Ver disponibilidad</button>
        </div>
        <div className="banner-image">
          <img src={iphone16} alt="iPhone 16" />
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
