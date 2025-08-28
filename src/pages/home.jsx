
import React from 'react';
import  Banner  from '../components/banner.jsx';
import ProductList from '../components/productList.jsx';
import BrandsList from '../components/brandsList.jsx';
import SecondaryBanner from '../components/secondBanner.jsx';
import Newsletter from '../components/newsletter.jsx';  
import ProductBanner from '../components/newsSection.jsx';
function Home({ showLoginModal, setShowLoginModal }) {


  return (
    <>
      <Banner />
      <ProductList showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      <BrandsList />
      <SecondaryBanner />
      <ProductBanner />
      <Newsletter />

    </>
  );
}


export default Home;