import { useState, useEffect } from 'react';
import { usePost } from "../hooks/useFetch";
import { Link } from 'react-router-dom';

const Register = ({ setShowLoginModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    password: '',
    confirmPassword: '',
    default_ship_address: ''
  });

  const [errors, setErrors] = useState({});
  const post = usePost();

  useEffect(() => {}, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await post('https://mindful-insight-production.up.railway.app/api/register', formData);
      setShowLoginModal(true);
      setErrors({});
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Error inesperado. Intenta de nuevo.' });
      }
    }
  };

  return (
    <div className='register-page col-lg-11'>
      <nav className="product-navbar">
        <Link to="/" className="back-link">← Volver a la página principal</Link>
      </nav>

      

      <form onSubmit={handleRegister} className='register-form'>
        <div className='header'>
          <h2 className='text-center'>Registrate y empieza a comprar!</h2>
        </div>
        {/* Nombre */}
        <label htmlFor="name">Nombre *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <small>Debe contener al menos 2 caracteres.</small>
        {errors.name && <span className="error-message">{errors.name[0]}</span>}

        {/* Email */}
        <label htmlFor="email">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <small>Formato válido: usuario@ejemplo.com</small>
        {errors.email && <span className="error-message">{errors.email[0]}</span>}

        {/* Teléfono */}
        <label htmlFor="phone">Teléfono *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <small>Incluye solo números (ej. 600123456).</small>
        {errors.phone && <span className="error-message">{errors.phone[0]}</span>}

        {/* Contraseña */}
        <label htmlFor="password">Contraseña *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <small>Mínimo 8 caracteres, incluye letras y números.</small>
        {errors.password && <span className="error-message">{errors.password[0]}</span>}

        {/* Confirmar Contraseña */}
        <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <small>Debe coincidir con la contraseña.</small>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword[0]}</span>}

        {/* Dirección de envío */}
        <label htmlFor="default_ship_address">Dirección de envío</label>
        <input
          type="text"
          name="default_ship_address"
          value={formData.default_ship_address}
          onChange={handleChange}
        />
        <small>(Opcional) Indica tu dirección de entrega por defecto.</small>
        {errors.default_ship_address && <span className="error-message">{errors.default_ship_address[0]}</span>}

        {errors.general && <span className="error-message">{errors.general}</span>}
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
