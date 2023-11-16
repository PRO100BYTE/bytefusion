import * as Route from '@/constants/routes';
import logo from '@/images/logo-full.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Разработано с ❤️ командой
            {' '}
            <a href="https://github.com/PRO100BYTE">PRO100BYTE</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          Copyright &copy;&nbsp;
          {new Date().getFullYear()}&nbsp;|&nbsp;
          ByteFusion by PRO100BYTE Team
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
            Исходный код проекта доступен &nbsp;
            <a href="https://github.com/PRO100BYTE/bytefusion">здесь</a>
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
