import React from 'react';
import { Button } from 'antd';

function ButtonSave(props) {
  return (
    <Button
      type="primary"
      htmlType="submit"
      {...props}
    >Lưu</Button>
  )
}

export default React.memo(ButtonSave);