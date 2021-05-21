import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import TopbarUser from './TopbarUser';
import { TopbarWrapper } from './Topbar.styles';
import { toggleCollapsed } from '../Dashboard/actions';

const { Header } = Layout;

export default function Topbar() {
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'topbarBlock collapsed' : 'topbarBlock'
        }
      >
        <div className="blockLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: '#333' }}
            onClick={handleToggle}
          />
        </div>

        <ul className="blockRight">
          <li className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
