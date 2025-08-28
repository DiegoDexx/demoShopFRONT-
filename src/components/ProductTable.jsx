import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';


const ProductTable = ({ products, deleteProduct,putLoading, 
  deleteLoading, setShowModal, setShowEditModal, setProductToEdit }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'stock', headerName: 'stock', width: 300 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botón de eliminar */}
          <button
            onClick={() => deleteProduct(params.row.id)}
            disabled={deleteLoading}
            className="btn btn-danger delete-button"
          >
            {deleteLoading ? 'Deleting...' : <FaTrashAlt />}
          </button>

          {/* Botón de editar */}
          <button
              onClick={() => {
            setShowEditModal(true); // Abre el modal
            setProductToEdit(params.row); // Pasa el producto completo al estado
            }}
            disabled={putLoading}
            className="btn edit-button"
          >
            {putLoading ? 'Editing...' : <FaPencilAlt />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="product-table" style={{ height: 400, width: '100%' }}>
      <div className="product-table-header">
        <h2>Product List</h2>
        <button
          className="btn btn-primary add-product-button"
          onClick={() => setShowModal(true)}
        >
          + Add product
        </button>
      </div>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={7} // Muestra 7 filas por página
        rowsPerPageOptions={[7]} // Opciones de paginación
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductTable;