import { useState, useRef, useEffect } from "react";


//search hooks
export function usePredictiveSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef();

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const url = `https://mindful-insight-production.up.railway.app/api/search/first-letter/${query}`;
      console.log('Petición de búsqueda predictiva:', url);
      fetch(url)
        .then(res => res.json())
          .then(data => {
            const products = data.products || [];
            setResults(products);
            setError(null);
            if (products.length > 0) {
              console.log('Resultados encontrados:', products);
            } else {
              console.log('Sin resultados para:', query);
            }
      })
        .catch(err => {
          setError(err);
          setResults([]);
          console.error('Error en la búsqueda:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 350); // 350ms debounce
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return { results, loading, error };
}

export function getSearchResultsByBrand(brand)  {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef();

  useEffect(() => {
    if (!brand || brand.length < 3) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const url = `https://mindful-insight-production.up.railway.app/api/search/brand/${brand}`;
      console.log('Petición de búsqueda por marca:', url);
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const products = data.products || [];
          setResults(products);
          setError(null);
          if (products.length > 0) {
            console.log('Resultados encontrados:', products);
          } else {
            console.log('Sin resultados para:', brand);
          }
        })
        .catch(err => {
          setError(err);
          setResults([]);
          console.error('Error en la búsqueda:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 350); // 350ms debounce
    return () => clearTimeout(debounceRef.current);
  }, [brand]);

  return { results, loading, error };
}


