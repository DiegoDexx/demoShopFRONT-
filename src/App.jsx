

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar'
import Home from './pages/home'
import AdminPanel from './pages/adminPanel'
import Login from './components/loginModal'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import store from './store' // Importa tu store de Redux
import ProductPage from './pages/productPage'
import CartModal from './components/cartModal'
import FAQMoviles from './pages/faq'
import SearchResults from './pages/searchResults'
import Register from './pages/register'

function App() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  return (
    <Provider store={store}>
      <Router>
        <NavBar 
          showLoginModal={showLoginModal} 
          setShowLoginModal={setShowLoginModal} 
        />
        <Routes>
          <Route path="/" element={<Home 
                                  showLoginModal={showLoginModal} 
                                  setShowLoginModal={setShowLoginModal} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/home" element={<Home 
                                      showLoginModal={showLoginModal} 
                                      setShowLoginModal={setShowLoginModal} />} />
          <Route path="/product/:id" element={<ProductPage 
                                                    showLoginModal={showLoginModal} 
                                                    setShowLoginModal={setShowLoginModal} />} />
          <Route path="*" element={<Home />} />
          <Route path="/faq" element={<FAQMoviles />} />
          <Route path="/searched-list" element={<SearchResults />} />
          <Route path="/register" element={<Register setShowLoginModal={setShowLoginModal} />} />
        </Routes>

        {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
        <Footer />
      </Router>
    </Provider>
  );
}



export default App
