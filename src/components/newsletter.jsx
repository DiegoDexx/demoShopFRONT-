import React from 'react';

import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <div className="newsletter col-lg-11">

        <div className="header">
      <h2>Subscribe to our Newsletter</h2>


      <div className="line"></div>  
        <p>Stay updated with the latest news and offers</p>

      </div>

      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
