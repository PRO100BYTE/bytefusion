import React from 'react';
import logo from '../../../src/images/favicon.png';
import logoWordmark from '../../../src/images/logo-wordmark.png';

const Preloader = () => (
  <div className="preloader">
    <img alt="ByteFusion logo" className="logo-symbol" src={logo} />
    <img alt="ByteFusion logo" src={logoWordmark} />
  </div>
);

export default Preloader;
