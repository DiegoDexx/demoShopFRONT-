import React from 'react';
import './showOrderModal.scss'; // Asegúrate de crear un archivo SCSS para los estilos

const ShowOrderModal = ({ order, onClose }) => {
  if (!order) return null; // Si no hay orden seleccionada, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Order Details</h2>
        <div className="order-details">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer Email:</strong> {order.customer_mail}</p>
           <p><strong>Customer Name:</strong> {order.customer_name}</p>
           <p><strong>Customer Address:</strong> {order.customer_address}</p>
          <p><strong>Customer Phone:</strong> {order.customer_phone}</p>
          <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <h3>Products:</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.name} (x{product.quantity}) - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderModal;