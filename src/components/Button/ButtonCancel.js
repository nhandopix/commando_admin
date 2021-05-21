import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

function ButtonCancel(props) {
  const history = useHistory();

  const onClickCancel = () => {
    history.goBack()
  };

  return (
    <Button onClick={onClickCancel} {...props}>Hủy</Button>
  )
}

export default React.memo(ButtonCancel);