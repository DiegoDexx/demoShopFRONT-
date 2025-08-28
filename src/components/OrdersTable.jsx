import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash, FaEye } from 'react-icons/fa';

const OrdersTable = ({ orders, deleteOrder, setOrderToEdit, showOrderDetails }) => {
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 100 },
    { field: 'customer_mail', headerName: 'Customer Email', width: 200 },
    {
      field: 'products',
      headerName: 'Products',
      width: 300,
      renderCell: (params) => (
        <ul>
          {params.row.products.map((product, index) => (
            <li key={index}>
              {product.name} (x{product.quantity})
            </li>
          ))}
        </ul>
      ),
    },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'total', headerName: 'Total ($)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botón de eliminar */}
          <button
            onClick={() => deleteOrder(params.row.id    )}
            className="btn btn-danger delete-button"
          >
            Cancel <FaTrash className="delete-icon" />
          </button>

          {/* Botón de editar */}
          <button
            onClick={() => { setOrderToEdit(params.row); showOrderDetails(params.row.id); }}
            className="btn edit-button"
          >
            Eye <FaPencilAlt className="edit-icon" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="orders-table" style={{ height: 400, width: '100%' }}>
      <h2>Orders List</h2>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={7} // Muestra 7 filas por página
        rowsPerPageOptions={[7]} // Opciones de paginación
        disableSelectionOnClick
        getRowId={(row) => row.id} // Usa el campo `id` como identificador único
      />
    </div>
  );
};

export default OrdersTable;