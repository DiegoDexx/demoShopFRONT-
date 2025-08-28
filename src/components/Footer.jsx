import React from 'react';
import logo from '../assets/img/logo_BLUE2.PNG';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLock } from 'react-icons/fa';
import visa from '../assets/img/Visa.png';
import mastercard from '../assets/img/MasterCard.png';
import paypal from '../assets/img/PaypalPNG.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer col-lg-11">
      <div className="container">
        <div className="row footer-main">
          
          {/* Logo */}
          <div className="col-2 footer-logo">
            <img src={logo} alt="Brand Logo" />
            <p>Oryon Shopping</p>
          </div>

          {/* Menú */}
          <div className="footer-menu">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <ul>
                <Link to="/home">Home</Link>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <Link to="/faq">FAQ</Link>
              </ul>

              <ul>
                <li><a href="#cancel">Cancel orders</a></li>
                <li><a href="#refunds">Refunds</a></li>
                <li><a href="#work">Work with us</a></li>
                <li><a href="#sellers">Sellers</a></li>
              </ul>

              <ul>
                <li><a href="#shipping">Shipping Policy</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pagos Seguros */}

      <div className="footer-secondary">
        <div className="footer-payments">
          <h4>Payment Methods</h4>
          <div className="payment-icons">
            <img src={visa} alt="Visa" />
            <img src={mastercard} alt="Mastercard" />
            <img src={paypal} alt="PayPal" />
            <div className="secure-payment">
              <FaLock />
            </div>
          </div>
          <p>💳 Pago 100% seguro con encriptación SSL</p>
          <p>🔒 Garantía de compra protegida</p>
        </div>

        {/* Redes Sociales & Legal */}
        <div className="row col-lg-12 footer-sub">

          <div className="col-12 text-center">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
            <p><a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a></p>
            <p>&copy; 2025 Oryon Shopping. All rights reserved.</p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
