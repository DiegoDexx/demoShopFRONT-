import React, { useState, useEffect } from 'react';
import { useGet, usePost, usePut, useDelete } from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import ProductTable from '../components/ProductTable';
import OrdersTable from '../components/OrdersTable';
import AddProductModal from '../components/AddProductModal';
import EditModal from '../components/EditModal';
import { addProduct, updateProduct, deleteProduct, deleteOrder } from '../actions/apiActions';



const AdminPanel = () => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [Orders, setOrders] = useState([]);

  const [productToEdit, setProductToEdit] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('products'); // Estado para alternar entre productos y pedidos
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState(null); // Estado para manejar errores

  //errores
  

  const { data: rawProducts = {}, loading} = useGet('https://mindful-insight-production.up.railway.app/api/products', token);
  const { data: rawOrders = {}, loading: ordersLoading, error: ordersError } = useGet('https://mindful-insight-production.up.railway.app/api/orders', token);

  const { post } = usePost();
  const { put } = usePut();
  const { deleteRequest } = useDelete();

  // Carga inicial de productos
  useEffect(() => {
    if (Array.isArray(rawProducts.products)) {
      setProducts(rawProducts.products);
    }
  }, [rawProducts]);

  // Carga inicial de pedidos
  useEffect(() => {
    if (Array.isArray(rawOrders.orders)) {
      setOrders(rawOrders.orders);
    }
  }, [rawOrders]);

  const handleAddProduct = async () => {
    await addProduct(newProduct, token, setProducts, setNewProduct, setShowModal, post, setError);
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    await updateProduct(id, updatedProduct, token, setProducts, setProductToEdit, put, setError);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id, token, setProducts, deleteRequest, setError);
  };

  const deleteOrderHandler = async (id) => {
    await deleteOrder(id, token, setOrders, put);
  }


  return (
    <div className="admin-panel container col-lg-11">
      <h1>Welcome to admin panel</h1>

      {/* Menú de selección */}
      <div className="selection-buttons mb-4">
        <button
          className={`btn ${selectedOption === 'products' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedOption('products')}
        >
          Products Gestion
        </button>
        <button
          className={`btn ${selectedOption === 'orders' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedOption('orders')}
        >
          Orders Gestion
        </button>
      </div>

      {/* Mostrar contenido según la opción seleccionada */}
      {selectedOption === 'products' && (
        <>
          {loading && <p>Loading products...</p>}
          {error && <p className="error-message">{error.message}</p>}

        { selectedOption === 'products' &&
          <ProductTable
            products={products}
            deleteProduct={handleDeleteProduct}
            updateProduct={handleUpdateProduct}
            setShowModal={setShowModal}
            setShowEditModal={setShowEditModal}
            setProductToEdit={setProductToEdit}
            error={error}
          /> 

        } 

        {
          selectedOption === 'orders' &&
        
          <OrdersTable
            orders={Orders}
            deleteOrder={handleDeleteProduct}
            updateOrder={handleUpdateProduct}
            setShowModal={setShowModal}
            setShowEditModal={setShowEditModal}
            setOrderToEdit={setOrderToEdit}
          /> 
        }
          
                    {showModal && (
            <AddProductModal
              newProduct={newProduct}
              handleInputChange={(e) =>
                setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
              }
              addProduct={handleAddProduct}
              setShowModal={setShowModal}
              errorMessage={error}

            />
          )}

          {showEditModal && (
            <EditModal
              productToEdit={productToEdit}
              handleInputChange={(e) =>
                setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value })
              }
              updateProduct={handleUpdateProduct}
              setShowModal={setShowEditModal}
              errorMessage={error}
            />
          )}
        </>
      )}

      {selectedOption === 'orders' && (
        <>
          {ordersLoading && <p>Loading orders...</p>}
          {ordersError && <p className="error-message">{ordersError.message}</p>}

          {/* Tabla de pedidos */}
          <OrdersTable
            orders={Orders}
            deleteOrder={deleteOrderHandler}
            setOrderToEdit={setOrderToEdit}
            showOrderDetails ={setShowOrderDetails}
          />
        </>
      )}

      {showOrderDetails && (
        <OrderDetailsModal
          order={orderToEdit}
          setShowOrderDetails={setShowOrderDetails}
        />
      )}
    </div>
  );
};

export default AdminPanel;