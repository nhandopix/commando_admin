import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ButtonDelete({ onConfirmDelete, disabled }) {
  return (
    <Popconfirm
      title="Xác nhận xóa ?"
      placement="topRight"
      okText='Đồng ý'
      cancelText='Hủy'
      disabled={disabled}
      onConfirm={onConfirmDelete}
    >
      <Button
        type="danger"
        size="large"
        icon={<DeleteOutlined />}
        disabled={disabled}
      >
        Xóa
      </Button>
    </Popconfirm>
  );
}

ButtonDelete.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onConfirmDelete: PropTypes.func.isRequired
};

export default React.memo(ButtonDelete);