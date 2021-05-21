import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover } from 'antd';
import { user } from '../../assets/images';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { handleLogout } from '../../features/login/actions';

export default function TopbarUser() {
  const dispatch = useDispatch();
  const [visible, setVisibility] = useState(false);
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <div className="isoDropdownLink" onClick={() => dispatch(handleLogout())}>Logout</div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={user} />
        <span className="userActivity" />
      </div>
    </Popover>
  );
}
