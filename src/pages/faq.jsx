import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo_BLUE2.PNG';
import Newsletter from '../components/newsletter';

const FAQMoviles = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  // Copiado al portapapeles
  const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str).then(() => {
      alert('Correo copiado al portapapeles!');
    }, (err) => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  };

  // Manejo del clic en el enlace
  const handleCopyClick = () => {
    copyToClipboard('tiendamovilesusados@gmail.com');
  };

  return (
    <div className="product-page col-lg-11">


     <nav className="product-navbar faq-navbar">
        <Link to="/" className="back-link">← Volver a la página principal</Link>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <p>Oryon Shopping</p>
        </div>
      </nav>


    <div className="contact-container">

      <h2>Preguntas frecuentes sobre móviles de segunda mano</h2>
      <div className="accordion">
        {/* Sección de FAQ sobre Garantía y Devoluciones */}
        <div className="accordion-item">
          <button
            id="accordion-button-1"
            aria-expanded={expandedAccordion === 1}
            onClick={() => toggleAccordion(1)}
          >
            <span className="accordion-title">¿Qué garantía tienen los móviles?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Todos nuestros móviles cuentan con <strong>6 meses de garantía</strong> cubriendo defectos de funcionamiento no relacionados con mal uso.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button
            id="accordion-button-2"
            aria-expanded={expandedAccordion === 2}
            onClick={() => toggleAccordion(2)}
          >
            <span className="accordion-title">¿Puedo devolver un móvil si no estoy satisfecho?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Sí, dispones de <strong>14 días naturales</strong> para devolver tu compra siempre que el móvil esté en el mismo estado en que lo recibiste.</p>
          </div>
        </div>

        {/* Sección sobre Estado y Funcionamiento */}
        <div className="accordion-item">
          <button
            id="accordion-button-3"
            aria-expanded={expandedAccordion === 3}
            onClick={() => toggleAccordion(3)}
          >
            <span className="accordion-title">¿En qué estado se encuentran los móviles?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Todos los móviles son revisados y clasificados en categorías: <em>Como nuevo</em>, <em>Muy buen estado</em> o <em>Buen estado</em>. En la ficha del producto encontrarás los detalles.</p>
          </div>
        </div>

        <div className="accordion-item">
          <button
            id="accordion-button-4"
            aria-expanded={expandedAccordion === 4}
            onClick={() => toggleAccordion(4)}
          >
            <span className="accordion-title">¿Los móviles son originales y desbloqueados?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Sí, todos nuestros dispositivos son <strong>originales</strong> y vienen <strong>libres de operador</strong>, listos para usar con cualquier compañía.</p>
          </div>
        </div>

        {/* Sección de Envío y Atención al Cliente */}
        <div className="accordion-item">
          <button
            id="accordion-button-5"
            aria-expanded={expandedAccordion === 5}
            onClick={() => toggleAccordion(5)}
          >
            <span className="accordion-title">¿Cuánto tarda el envío?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Los envíos suelen tardar entre <strong>24 y 72 horas</strong> laborables dentro de España peninsular.</p>
          </div>
        </div>

        <div className="accordion-item">
          <button
            id="accordion-button-6"
            aria-expanded={expandedAccordion === 6}
            onClick={() => toggleAccordion(6)}
          >
            <span className="accordion-title">¿Cómo puedo contactar con atención al cliente?</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
          <div className="accordion-content">
            <p>Puedes escribirnos a nuestro <span onClick={handleCopyClick} className="copy-text">correo de contacto</span> y te responderemos lo antes posible.</p>
          </div>
        </div>
      </div>
    </div>
    <Newsletter />
    </div>
  );
};

export default FAQMoviles;
