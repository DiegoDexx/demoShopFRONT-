import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePredictiveSearch, getSearchResultsByBrand } from '../functions/search';
import productImages from '../utils/jsonVarables';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../actions/searchResultsActions';
import { useNavigate } from 'react-router-dom';

const Search = ({ onResultClick }) => {
  const [query, setQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);

  
  const { results, loading } = usePredictiveSearch(query);
  const { results: brandResults, loading: brandLoading } = getSearchResultsByBrand(query);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (!isMobile) {
        setShowMobileSearch(false);
      }
    }, [isMobile]);

    useEffect(() => {
      if (!isTablet) {
        setShowMobileSearch(false);
      }
    }, [isTablet]);

  // 🔎 Unificar resultados y evitar duplicados
  const allResults = useMemo(() => {
    const map = new Map();
    [...results, ...brandResults].forEach(item => {
      if (item && item.id) map.set(item.id, item);
    });
    return Array.from(map.values());
  }, [results, brandResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Array.isArray(allResults)) {
      dispatch(setSearchResults(allResults));
      navigate('/searched-list');
      // cerrar en móvil tras buscar
      setShowMobileSearch(false);
      setQuery(''); // limpiar resultados después de submit
    }
  };

  const handleCloseSearch = () => {
    setShowMobileSearch(false);
    setQuery(''); // 🔑 limpiar query para ocultar resultados
  };

  useEffect(() => {
    if (allResults && allResults.length > 0) {
      console.log('Resultados totales encontrados:', allResults);
    }
  }, [allResults]);

  return (
    <div className="search-container">
      {isMobile || isTablet ? (
        !showMobileSearch ? (
          // 🔎 Botón icono búsqueda (móvil cerrado)
          <button
            className="search-icon-btn"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Abrir búsqueda"
          >
            <FaSearch size={20} />
          </button>
        ) : (
          // 🔎 Formulario búsqueda en móvil
          <form onSubmit={handleSubmit} className="search-form-mobile">
            <input
              type="text"
              placeholder="Search products..."
              name="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            <button
              type="button"
              className="search-close-btn"
              onClick={handleCloseSearch}
              aria-label="Cerrar búsqueda"
            >
              ✕
            </button>
          </form>
        )
      ) : (
        // 🔎 Versión escritorio
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for products..."
            name="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="submit"><FaSearch /></button>
        </form>
      )}

      {/* 🔎 Resultados predictivos */}
      {showMobileSearch || query.length >= 3 && (
        <div className="search-results">
          {loading || brandLoading ? (
            <div className="search-loading">Searching...</div>
          ) : allResults.length > 0 ? (
            <div className="search-results-list">
              {allResults.map((item, idx) => (
                <li
                  className="search-result-item"
                  key={item.id || idx}
                  onClick={() => onResultClick?.(item)}
                >
                  {item.name || item.title || item}
                  <span className="search-price">{item.price}€</span>
                  {productImages[item.name] && (
                    <img src={productImages[item.name]} alt={item.name} />
                  )}
                </li>
              ))}
            </div>
          ) : (
            <div className="search-no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
