import { useState, useEffect } from 'react';
import { useGet, usePost } from '../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';
import { FaBox, FaTruck, FaHandsHelping } from 'react-icons/fa';
import { addToCartApi } from '../actions/apiActions';

const ProductPage = ({ showLoginModal, setShowLoginModal }) => {
  const productId = localStorage.getItem('productId');
  const productImage = localStorage.getItem('productImage');
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const isMobile = window.innerWidth <= 768; // Detecta si es móvil
  const { data, loading, error } = useGet(`https://mindful-insight-production.up.railway.app/api/products/${productId}`, null);
  const { post, loading: postLoading, error: postError } = usePost();

  const [cartId, setCartId] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    image: productImage || 'https://via.placeholder.com/300',
    state: '',
    price: 0,
    stock: 0,
    brand: '',
    color: '',
  });

  const [showFullDescription, setShowFullDescription] = useState(false);



  useEffect(() => {
    if (data && data.product) {
      setProductData((prevData) => ({
        ...prevData,
        name: data.product.name || prevData.name,
        description: data.product.description || prevData.description,
        image: data.product.image || prevData.image,
        state: data.product.state || prevData.state,
        price: data.product.price || prevData.price,
        stock: data.product.stock || prevData.stock,
        brand: data.product.brand || prevData.brand,
        color: data.product.color || prevData.color,
      }));
    }
  }, [data]);

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    const result = await addToCartApi(token, userId, cartId, post, productId, dispatch, setCartId);
    if (result && result.cartId) {
      setCartId(result.cartId);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error fetching product details: {error}</p>;

  return (
    <div className="product-page col-lg-11">
      {/* Navbar */}
      <nav className="product-navbar">
        <Link to="/home" className="back-link">← Volver a la página principal</Link>
      </nav>

      <div className="product-details-container">
        {/* Imagen del producto */}
        <div className="product-image-container">
          <img
            src={productImage}
            alt={productData.name || 'Imagen no disponible'}
            className="product-image"
          />
          </div>

        {/* Detalles del producto */}
        <div className="product-info">
          <h1 className="product-name">{productData.name || 'Nombre no disponible'}</h1>
          <p className="product-price">
            <strong className="product-price-label">€{productData.price ? productData.price : '0.00'}</strong>
            <small className="product-tax-label"> con Impuestos añadidos</small>
          </p>

          {/* Descripción */}
    <div className="product-description-section">
        <p className="product-description">
          <strong>Descripción:</strong>{' '}
          {isMobile && !showFullDescription && productData.description?.length > 130
            ? `${productData.description.substring(0, 80)}...`
            : productData.description}
        </p>

        {isMobile && productData.description?.length > 130 && (
          <button
            className="see-more-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#0d0e0fff',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0,
              marginTop: '0.1rem',
              fontSize: '0.95rem',
            }}
            onClick={() => { setShowFullDescription(prev => !prev); console.log(showFullDescription); }}
          >
            {showFullDescription ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>
          {/* Color */}
          <div className="product-color">
            <span
              className="color-circle"
              style={{
                display: 'inline-block',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: productData.color || '#ccc',
                border: '1px solid #ddd',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              }}
            ></span>
            <strong className="product-color-label">Color:</strong> {productData.color || 'Color no disponible'}
          </div>

          <p className="product-state">
            <strong className="product-state-label">Estado: </strong> {productData.state || 'Estado no disponible'}
          </p>

          <p className="product-stock">
            {productData.stock > 0 ? (
              <span className="in-stock">En stock</span>
            ) : (
              <span className="no-stock">Agotado</span>
            )}
          </p>

          <p className="product-brand">
            <strong className="product-brand-label">Marca:</strong> {productData.brand || 'Marca no disponible'}
          </p>

          {/* Botón para añadir al carrito */}
          {productData.stock > 0 ? (
            <button className="add-to-cart-button" onClick={handleAddToCart} disabled={postLoading}>
              {postLoading ? 'Añadiendo...' : 'Añadir al carrito'}
            </button>
          ) : (
            <button className="out-of-stock-button" disabled>
              Producto agotado
            </button>
          )}
          {postError && <p className="error-message">Error: {postError.message}</p>}
        </div>
      </div>

      {/* Tarjetas de ventajas */}
      <div className="advantages-section">
        <div className="header">
          <h2 className="title">
            <p className="p1">Porque comprar en Oryon es una experiencia única:</p>
          </h2>
          <hr className="line" />
        </div>
        <div className="advantages-cards">
          <div className="advantage-card">
            <FaTruck />
            <h3>Envío rápido</h3>
            <p>Recibe tu pedido en 24-48 horas. <small><a href="#">Más Información</a></small></p>
          </div>
          <div className="advantage-card">
            <FaBox />
            <h3>Garantía de devolución</h3>
            <p>Si no estás satisfecho, te devolvemos el dinero.</p>
          </div>
          <div className="advantage-card">
            <FaHandsHelping />
            <h3>Soporte 24/7</h3>
            <p>Nuestro equipo está disponible para ayudarte.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
