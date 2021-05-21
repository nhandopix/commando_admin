import React from 'react';
import { logo, logo_mb } from '../assets/images';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {
        collapsed ? (
          <img className="img" src={logo_mb} alt="logo" />
        )
          : (
            <img className="img" src={logo} alt="logo" />
          )
      }
    </div>
  );
};