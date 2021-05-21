import * as actionTypes from './actionTypes';

export function getView(width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}

const toggleCollapsed = () => ({
  type: actionTypes.COLLPSE_CHANGE,
});

const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== 'DesktopView';
  return {
    type: actionTypes.TOGGLE_ALL,
    collapsed,
    view,
    height,
  };
};

const toggleOpenDrawer = () => ({
  type: actionTypes.COLLPSE_OPEN_DRAWER,
});

const changeOpenKeys = (openKeys) => ({
  type: actionTypes.CHANGE_OPEN_KEYS,
  openKeys,
});

const changeCurrent = (current) => ({
  type: actionTypes.CHANGE_CURRENT,
  current,
});
const clearMenu = () => ({
  type: actionTypes.CLEAR_MENU
});

export {
  toggleCollapsed,
  toggleAll,
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  clearMenu
}