import PropTypes from 'prop-types';
import React from 'react';
import { Tag } from 'antd';

function StatusActive({ isActive = false }) {
  return (
    <Tag color={isActive ? '#87d068' : '#ff4d4f'}>
      {isActive ? 'Hoạt động' : 'Khóa'}
    </Tag>
  );
}

StatusActive.propTypes = {
  isActive: PropTypes.bool.isRequired
};

export default React.memo(StatusActive);