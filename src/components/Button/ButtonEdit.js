import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export default function ButtonEdit({ id, children }) {
  const location = useLocation();

  return (
    <Link to={`${location.pathname}/${id}`}>{children}</Link>
  );
}

ButtonEdit.propTypes = {
  id: PropTypes.string.isRequired
};