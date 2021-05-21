import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function ButtonCreate() {
  const location = useLocation();

  return (
    <Link to={`${location.pathname}/create`}>
      <Button
        icon={<PlusOutlined />}
        size="large"
        type="primary"
      >
        Tạo mới
    </Button>
    </Link>
  );
}

export default React.memo(ButtonCreate);