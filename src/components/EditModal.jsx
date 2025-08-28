import React from 'react';

const EditModal = ({
  productToEdit,
  handleInputChange,
  updateProduct,
  putLoading,
  setShowModal,
  errorMessage,
}) => {
  return (
    <div className="modal show d-block custom-modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value={productToEdit.name || ''}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter product description"
                value={productToEdit.description || ''}
                onChange={handleInputChange}
                className="form-control description-textarea"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={productToEdit.price || ''}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={productToEdit.category}
                onChange={handleInputChange}
                className="form-control"
                required
                >   

                <option value="">Select a category</option>
                <option value="electronics">Smartphones</option>
                <option value="clothing">Tablets</option>
                <option value="home">Laptops</option>
                <option value="books">Desktop</option>
                
                </select>            
             </div>

            {/* Agregar state*/}
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={productToEdit.state || ''}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select a state</option>
                <option value="como nuevo">New</option>
                <option value="en buen estado"> good</option>
                <option value="funcional">functional</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="Stock"
                value={productToEdit.stock || ''}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn-primary save-button"
              onClick={() => updateProduct(productToEdit.id, productToEdit)}
              disabled={putLoading}
            >
              {putLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Optional: Add a loading and error spinner or message here if needed */}
          {putLoading && <div className="loading-message">Loading...</div>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
                  </div>
      </div>
    </div>
    
    </div>);
};

export default EditModal;