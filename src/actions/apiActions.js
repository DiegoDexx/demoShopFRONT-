import { Navigate } from 'react-router-dom';
import { addToCart as addToCartSlice } from '../slices/cartSlices';



export const addProduct = async (newProduct, token, setProducts, setNewProduct, setShowModal, post, setError) => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const url = 'https://mindful-insight-production.up.railway.app/api/products';
      const body = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      };
  
      try {
        const addedProduct = await post(url, body, token);
        setProducts((prevProducts) => [...prevProducts, addedProduct]); // Agrega el nuevo producto al estado
        setNewProduct({ name: '', price: '', stock: '' }); // Limpia el formulario
        setShowModal(false); // Cierra el modal
      } catch (error) {
        if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            const errorMessages = Object.values(validationErrors).flat().join(' ');
            setError(errorMessages); // Muestra los mensajes de error en el frontend
            throw error; // Lanza el error para manejarlo en el componente si es necesario
        } else {
            setError('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };
  
  export const updateProduct = async (id, updatedProduct, token, setProducts, setProductToEdit, put, setError) => {
    const url = `https://mindful-insight-production.up.railway.app/api/products/${id}`;
    const body = {
        name: updatedProduct.name,
        price: parseFloat(updatedProduct.price),
        stock: parseInt(updatedProduct.stock),
        state: updatedProduct.state,
        description: updatedProduct.description,
        category: updatedProduct.category,
    };

    try {
        await put(url, body, token);
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
            )
        );
        setProductToEdit(null); // Limpia el producto en edición
    } catch (error) {
     
        if (error.response && error.response.status === 422) {
            // Extrae los mensajes de error del backend
            const validationErrors = error.response.data.errors;
            const errorMessages = Object.values(validationErrors).flat().join(' ');
            setError(errorMessages); // Muestra los mensajes de error en el modal
        } else {
            setError('An unexpected error occurred. Please try again later.');
        }
        throw error; // Lanza el error para manejarlo en el componente si es necesario
    }
};
  
  export const deleteProduct = async (id, token, setProducts, deleteRequest, setError) => {
    const url = `https://mindful-insight-production.up.railway.app/api/products/${id}`;

    try {
      await deleteRequest(url, {}, token);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      alert(`Failed to delete product with ID ${id}: ${error.message}`);
      setError('Failed to delete product. Please try again.');
        throw error; // Lanza el error para manejarlo en el componente
    }
  };

export const deleteOrder = async (id, token, setOrders, deleteRequest, setError) => {
    const url = `https://mindful-insight-production.up.railway.app/api/orders/${id}`; // Updated URL to point to orders endpoint

    try {
      await deleteRequest(url, {}, token);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
    } catch (error) {
      console.error(`Failed to delete order with ID ${id}:`, error);
        setError('Failed to delete order. Please try again.');
      throw error; // Lanza el error para manejarlo en el componente
    }
}

  //same with orders
  // Cambiar el estado de una orden a "cancelled"
export const cancelOrder = async (id, token, setOrders, put) => {
    const url = `https://mindful-insight-production.up.railway.app/api/orders/${id}`;
    const body = { status: 'cancelled' };
  
    try {
      await put(url, body, token);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: 'cancelled' } : order
        )
      );
      console.log(`Order ${id} has been marked as cancelled.`);
    } catch (error) {
      console.error(`Failed to cancel order with ID ${id}:`, error);
    }
  };
  
  // Crear carrito
export const createCart = async (user_id, token, setCart, post) => {
  const url = 'https://mindful-insight-production.up.railway.app/api/carts';
  const body = {
    user_id: user_id,
    status: 'completed' // mejor que 'completed' para empezar
  };

  try {
    const response = await post(url, body, token);
    console.log('Respuesta de createCart:', response.data);

    // 👇 extrae el carrito real, sea response.data.cart o response.data
    const cart = response.data.cart ?? response.data;

    setCart(cart);
    return cart; // ahora sí devuelve { id, user_id, status... }
  } catch (error) {
    console.error('Error creando carrito:', error);
    throw error;
  }
};


// Añadir producto al carrito
export const addToCartApi = async (token, userId, cartId, post, productId, dispatch, setCartId) => {
  try {
    // Si no existe carrito, creamos uno
    if (!cartId) {
      const newCart = await createCart(userId, token, (cart) => {
        setCartId(cart.id);
        localStorage.setItem('cartId', cart.id);
        //COMPROBACIÓN
        console.log('Carrito creado:', cart);
      }, post);
      cartId = newCart.id; // 👈 ahora sí tiene id real
    }

    // COMPROBACIÓN:
    console.log('Añadiendo al carrito de id: ', cartId);

    const body = {
      cart_id: cartId,
      product_id: productId,
      quantity: 1,
    };

    const response = await post('https://mindful-insight-production.up.railway.app/api/cart-items', body, token);

    if (response.status === 201) {
      dispatch(addToCartSlice(response.data)); // ✅ asegurarse que esté importado
    } else {
      alert('Hubo un problema al añadir el producto al carrito.');
    }
  } catch (error) {
    console.error('Error al añadir al carrito:', error);
    alert('Error al añadir el producto al carrito.');
  }
};



export const removeFromCartApi = async (token, deleteRequest, productId) => {
  try {
    const response = await deleteRequest(`/cart-items/${productId}`, token);

    if (response.status === 204 || response.status === 200) {
      console.log('Producto eliminado del carrito:', productId);
      return productId; // devolvemos el id
    } else {
      throw new Error('Hubo un problema al eliminar el producto del carrito');
    }
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
};

