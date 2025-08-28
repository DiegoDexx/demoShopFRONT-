import React, { useEffect, useState } from 'react';
import { useGet, usePost } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { addToCartApi } from '../actions/apiActions';
import { useSelector, useDispatch } from 'react-redux';
import productImages from '../utils/jsonVarables';

const ProductList = ({ showLoginModal, setShowLoginModal }) => {
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useGet('https://mindful-insight-production.up.railway.app/api/products', null);
  const productId = localStorage.getItem('productId');

  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [cartId, setCartId] = useState(null);
  const { post } = usePost();
  const dispatch = useDispatch();

  console.log('Data:', data); // Verifica el contenido de data

  const handleSaveIdAndImage = (id, image) => {
    localStorage.setItem('productId', id);
    localStorage.setItem('productImage', image);
    console.log(`Saved Product ID: ${id}, Image: ${image}`);
  }


  useEffect(() => {
    if (data && Array.isArray(data.products)) {
      const slicedProducts = data.products.slice(0, 5).map((product) => ({
        ...product,
        image: productImages[product.name] || 'https://via.placeholder.com/300', // Asigna la imagen correspondiente o un placeholder
      }));
      console.log('Sliced Products with Images:', slicedProducts);
      setProducts(slicedProducts);
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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className='product-list-container col-lg-11'>

    <div className='header'>
      <h2 className="title">
        <p className='p1'>Nuestras sugerencias de&nbsp;</p>
        smartphones:
      </h2>
        <hr className="line" />
    </div>
        <div className="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
              <div className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.state}</p>
                <div className="price-container">
                  <p className="original-price">Desde {product.price}€</p>
                </div>
            <Link to={`/product/${product.id}`} key={index}>
              <div className="product-overlay" onClick={() => handleSaveIdAndImage(product.id, product.image)}>
                <button className="add-to-cart-button" onClick={(e) => { e.preventDefault(); handleAddToCart(product.id); }}>Añadir al carrito</button>
              </div>
               </Link>
            </div>
           
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;