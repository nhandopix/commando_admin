import { isServer } from '../../utils/isServer';
import { getDefaultPath } from '../../utils/url_sync';
import * as actionTypes from './actionTypes';
import { getView } from './actions';

const preKeys = getDefaultPath();
const initState = {
  collapsed: !isServer && window.innerWidth > 1220 ? false : true,
  view: !isServer && getView(window.innerWidth),
  height: !isServer && window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys,
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case actionTypes.COLLPSE_CHANGE: {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    }

    case actionTypes.COLLPSE_OPEN_DRAWER: {
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    }

    case actionTypes.TOGGLE_ALL: {
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height,
        };
      }
      break;
    }

    case actionTypes.CHANGE_OPEN_KEYS: {
      return {
        ...state,
        openKeys: action.openKeys,
      };
    }

    case actionTypes.CHANGE_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }

    case actionTypes.CLEAR_MENU: {
      return {
        ...state,
        openKeys: [],
        current: [],
      };
    }

    default:
      return state;
  }

  return state;
}