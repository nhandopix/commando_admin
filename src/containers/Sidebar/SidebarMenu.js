import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

const SubMenu = Menu.SubMenu;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

export default React.memo(function SidebarMenu({
  singleOption,
  submenuStyle,
  submenuColor,
  ...rest
}) {
  let match = useRouteMatch();

  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            {typeof leftIcon === 'string' ? (<div className="anticon icon"><i className={leftIcon} /></div>) : leftIcon}
            <span className="nav-text">
              <FormattedMessage id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map(child => {
          const linkTo = child.withoutDashboard
            ? `/${child.key}`
            : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link style={submenuColor} to={linkTo}>
                {typeof leftIcon === 'string' ? (<div className="anticon icon"><i className={child.leftIcon} /></div>) : child.leftIcon}
                <FormattedMessage id={child.label} />
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key} {...rest}>
      <Link to={`${url}/${key}`}>
        <span className="isoMenuHolder" style={submenuColor}>
          {typeof leftIcon === 'string' ? (<div className="anticon icon"><i className={leftIcon} /></div>) : leftIcon}
          <span className="nav-text">
            <FormattedMessage id={label} />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
});
