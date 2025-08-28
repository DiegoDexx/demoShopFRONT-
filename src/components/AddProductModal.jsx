import React from 'react';

const AddProductModal = ({
  newProduct,
  handleInputChange,
  addProduct,
  postLoading,
  setShowModal,
  errorMessage,
}) => {
  return (
    <div className="modal show d-block custom-modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
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
                value={newProduct.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="form-control description-textarea"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Agregar category and state como selects*/}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={newProduct.category}
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
                value={newProduct.state}
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
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
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
              className="btn-primary add-button"
              onClick={addProduct}
              disabled={postLoading}
            >
              {postLoading ? 'Adding...' : 'Add Product'}
            </button>
            {errorMessage && (
              <div className="alert alert-danger mt-2" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;