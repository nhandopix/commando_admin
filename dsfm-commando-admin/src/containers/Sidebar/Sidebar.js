import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Layout } from 'antd';
import { Logo, CustomScrollBar } from '../../components';
import { SidebarWrapper } from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
import options from './options';
import { ROLE_OPTIONS } from './roleOptions';

import {
  // toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} from '../Dashboard/actions';

const { Sider } = Layout;

export default function Sidebar() {
  const dispatch = useDispatch();
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector(state => state.App);
  const { role } = useSelector((state) => state.auth.userInfo);

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
      }, 100);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  // const onMouseEnter = event => {
  //   if (collapsed && openDrawer === false) {
  //     dispatch(toggleOpenDrawer());
  //   }
  //   return;
  // };
  // const onMouseLeave = () => {
  //   if (collapsed && openDrawer === true) {
  //     dispatch(toggleOpenDrawer());
  //   }
  //   return;
  // };
  const styling = {
    backgroundColor: '#007eb3',
  };
  const submenuStyle = {
    // backgroundColor: 'rgba(0,0,0,0.3)', background color for submenu
    color: '#ffffff',
  };
  const submenuColor = {
    color: '#ffffff',
  };
  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isoSidebar"
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <CustomScrollBar style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            className="isoDashboardMenu"
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
          >
            {
              role === 'ADMIN' ? (
                options.map(singleOption => (
                  <SidebarMenu
                    key={singleOption.key}
                    submenuStyle={submenuStyle}
                    submenuColor={submenuColor}
                    singleOption={singleOption}
                  />
                ))
              ) : (
                  ROLE_OPTIONS[role].map(singleOption => (
                    <SidebarMenu
                      key={singleOption.key}
                      submenuStyle={submenuStyle}
                      submenuColor={submenuColor}
                      singleOption={singleOption}
                    />
                  ))
                )
            }
          </Menu>
        </CustomScrollBar>
      </Sider>
    </SidebarWrapper>
  );
}