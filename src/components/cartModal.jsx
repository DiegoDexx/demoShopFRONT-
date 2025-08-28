import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPaperPlane, FaShippingFast, FaTrash } from 'react-icons/fa';
import { removeFromCart } from '../slices/cartSlices';
import { removeFromCartApi } from "../actions/apiActions";
import { useDelete } from "../hooks/useFetch";

import productImages from '../utils/jsonVarables';

const CartModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartId = localStorage.getItem("cartId"); // 👈 guardado cuando se creó carrito
  const token = useSelector(state => state.auth.token);

  const [cartItemsDetails, setCartItemsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteRequest } = useDelete();

  // 🔹 Traer productos del carrito por cart_id
 useEffect(() => {
  const fetchCartItems = async () => {
    if (!cartId) {
      setCartItemsDetails([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/api/cart-items/cart/${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });



      if (!res.ok) throw new Error('Error fetching cart items');
      const data = await res.json();

      console.log("Respuesta carrito:", data);

      // 👇 garantizamos array
     setCartItemsDetails(data.cartItems || []); // 👈 GUARDA SOLO EL ARRAY
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCartItems();
}, [cartId, token]);


  const [shipping, setShipping] = useState("standard");
  const shippingCost = shipping === "standard" ? 5 : 10;
const total = (cartItemsDetails || []).reduce(
  (sum, i) => sum + i.product.price * i.quantity,
  0
) + shippingCost;
  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCartApi(token, deleteRequest, cartItemId);
      dispatch(removeFromCart(cartItemId));
      // Refetch después de eliminar
      setCartItemsDetails(prev => prev.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal open">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Tu Carrito</h2>

        {cartItemsDetails.length > 0 && !loading ? (
          <>
            <div className="cart-items">
              {cartItemsDetails.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={productImages[item.product.name]} alt={item.product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p>Precio: €{item.product.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Subtotal: €{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className="remove-button" onClick={() => handleRemove(item.id)}>
                    <FaTrash /> Quitar
                  </button>
                </div>
              ))}
            </div>

            <div className="shipping-options">
              <h4>Opciones de envío:</h4>
              <div className="options-container">
                <label className={shipping === "standard" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shipping === "standard"}
                    onChange={() => setShipping("standard")}
                  />
                  <FaShippingFast /> Envío estándar - €5.00
                </label>

                <label className={shipping === "express" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shipping === "express"}
                    onChange={() => setShipping("express")}
                  />
                  <FaPaperPlane /> Envío exprés - €10.00
                </label>
              </div>
            </div>

            <div className="cart-total">
              <h3>Total a pagar: €{total.toFixed(2)}</h3>
            </div>
            <button className="checkout-button" onClick={() => alert('Estas en una versión demo de oryonshopping.com')}>
              Proceder al Pago
            </button>
          </>
        ) : (
          !loading && <p>Tu carrito está vacío</p>
        )}
      </div>
    </div>
  );
};

export default CartModal;
