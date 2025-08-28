import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaShoppingCart, FaDoorClosed, FaUser } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import throttle from 'lodash.throttle';
import logo from '../assets/img/logo_blue2.png';
import { usePost } from "../hooks/useFetch";
import { logoutUser } from '../actions/authActions';
import Search from './Search';
import CartModal from './cartModal';

const NavBar = ({ showLoginModal, setShowLoginModal }) => {
  const [isResponsive, setIsResponsive] = useState(false);
  const [navBarClass, setNavBarClass] = useState('primary-navbar');
  const [showCartModal, setShowCartModal] = useState(false);


  const location = useLocation();
  const { post } = usePost();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartQuantity = useSelector((state) => state.cart?.totalQuantity || 0);
  const token = useSelector((state) => state.auth.token);

  const toggleResponsive = () => setIsResponsive(!isResponsive);

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (!confirm) return;

    try {
      await post('https://github.com/DiegoDexx/demoShopFRONT/api/logout', {}, token);
      dispatch(logoutUser());
      navigate("/home");
    } catch (error) {
      console.error('Logout failed:', error.response || error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleScroll = throttle(() => {
    if (location.pathname === '/reservas') {
      setNavBarClass(window.scrollY > 80 ? 'secondary-navbar' : 'primary-navbar');
    }
  }, 200);

  useEffect(() => {
    if (location.pathname !== '/reservas') {
      setNavBarClass('tertiary-navbar');
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  const showMenuClass = isResponsive ? 'menu-container responsive' : 'menu-container';

  /** 🔎 Componente de búsqueda reutilizable */
  


  const AuthenticatedNavBar = () => (
    <div className={`topnav ${navBarClass} ${isResponsive ? 'responsive' : 'col-lg-11'}`}>
      <div className="head-container">

        
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p>Oryon Shopping</p>
        </div>
        <Search />
        <a href="javascript:void(0);" className="icon" onClick={toggleResponsive}>
          <FaBars />
        </a>
        <div className="options-container">
          <div className={showMenuClass}>
            {isResponsive && (
              <div className="menu-header">
                <span className="back-icon" onClick={toggleResponsive}>&#8592; Back</span>
              </div>
            )}
            <Link to="/profile"><FaUser />&nbsp;My Profile</Link>
            <div onClick={() => setShowCartModal(true)} className="cart-link">
              <FaShoppingCart /> Cart
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </div>
            <li onClick={handleLogout}><FaDoorClosed />&nbsp;Log out</li>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminNavbar = () => (
    <div className={`topnav ${navBarClass} ${isResponsive ? 'responsive' : 'col-lg-11'}`}>
      <div className="head-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p>Oryon Shopping</p>
        </div>
        <Search />
        <a href="javascript:void(0);" className="icon" onClick={toggleResponsive}>
          <FaBars />
        </a>
        <div className="options-container">
          <div className={showMenuClass}>
            {isResponsive && (
              <div className="menu-header">
                <span className="back-icon" onClick={toggleResponsive}>&#8592; Back</span>
              </div>
            )}
            <Link to="/home">Go to Shop</Link>
            <li onClick={handleLogout}>Log out</li>
          </div>
        </div>
      </div>
    </div>
  );

  const GuestNavBar = () => (
    <div className={`topnav ${navBarClass} ${isResponsive ? 'responsive' : 'col-lg-11'}`}>
      <div className="head-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p>Oryon Shopping</p>
        </div>
        <Search />
        <a href="javascript:void(0);" className="icon" onClick={toggleResponsive}>
          <FaBars />
        </a>
        <div className="options-container">
          <div className={showMenuClass}>
            {isResponsive && (
              <div className="menu-header">
                <span className="back-icon" onClick={toggleResponsive}>&#8592; Back</span>
              </div>
            )}
            <div onClick={handleLoginClick}>Login/Sign-in</div>
            <a href="/faq">Contact & FAQ</a>
            <div onClick={() => setShowCartModal(true)} className="cart-link">
              <FaShoppingCart /> Cart
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {token && location.pathname === '/admin' ? (
        <AdminNavbar />
      ) : token ? (
        <AuthenticatedNavBar />
      ) : (
        <GuestNavBar />
      )}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    </>
  );
};

export default NavBar;
