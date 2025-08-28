import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productImages from '../utils/jsonVarables';

const SearchResults = () => {
  const results = useSelector(state => state.searchResults.results);
  const navigate = useNavigate();

  return (
    <div className="search-results-page ">
      <nav className="search-results-navbar">
        <div className="navbar-left">
          <button onClick={() => navigate('/')}>↩ Volver atrás</button>
          <span>Resultados de búsqueda</span>
        </div>
        <div className="navbar-right">
          <button className="filter-btn">Filtrar</button>
          {/* Aquí irá el menú de filtros si lo necesitas */}
          
        </div>
      </nav>
      <div className='product-list-container '>
        {/* <div className='header'>
          <h2 className="title">
            <p className='p1'>Resultados de&nbsp;</p>
            búsqueda:
          </h2>
          <hr className="line" />
        </div> */}
        <div className="product-list container">
          {results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No hay resultados de búsqueda.</div>
          ) : (
            results.map((product, index) => (
              <div className="product-card" key={product.id || index}>
                <img
                  src={productImages[product.name] || product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.state || product.description}</p>
                <div className="price-container">
                  <p className="original-price">Desde {product.price}€</p>
                </div>
                {/* Puedes agregar overlay, botón de carrito, etc. */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
