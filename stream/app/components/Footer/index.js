import React from 'react';

function Footer() {
  return (
    <div className="footer-wrapper">
        <div className="logo-text-wrapper">
          <h1 className="font-24 hero-text m-0 ml-3 text-light">Node Task</h1>
        </div>
        <div className="footer-links">
          <label className="mb-0 mx-2 text-light cursor">About Us</label>
          <label className="mb-0 mx-2 text-light cursor">Help</label>
          <label className="mb-0 mx-2 text-light cursor">
            Terms & Conditions
        </label>
          <label className="mb-0 mx-2 text-light cursor">Privacy Policy</label>
        </div>
      </div>
  );
}

export default Footer;
