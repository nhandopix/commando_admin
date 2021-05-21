import PropTypes from 'prop-types';
import React from 'react';
import { Tag } from 'antd';

const STATUS = {
  PENDING: '#FCB034',
  TODO: '#FCB034',
  AWAIT: '#FCB034',
  IN_PROCESS: '#1890ff',
  DONE: '#87d068',
  PASSED: '#87d068',
  FAILED: '#ff4d4f',
};

function StatusCode({ status }) {
  return (
    <Tag color={STATUS[status] || 'default'}>
      {status || 'NULL'}
    </Tag>
  )
}

StatusCode.propTypes = {
  status: PropTypes.string.isRequired
};

export default React.memo(StatusCode);