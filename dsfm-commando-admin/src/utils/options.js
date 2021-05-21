import React from 'react';
import {
  FaStore,
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaCrosshairs,
  // FaList,
  FaRegChartBar
} from 'react-icons/fa';

/**
 * Lưu ý:
 * - Khi sử dụng icon trong ionicon-v2 (leftIcon: 'ion-person-stalker')
 * - Khi sử dụng icon trong Antd (leftIcon: <AppstoreOutlined />)
 * - Khi sử dụng icon trong react/icons (leftIcon: <FaStore className="anticon" />)
 */
const options = [
  {
    key: 'charts',
    label: 'sidebar.charts',
    leftIcon: <FaRegChartBar className="anticon" />,
  },
  {
    key: 'mers',
    label: 'sidebar.mers',
    leftIcon: <FaUser className="anticon" />,
  },
  {
    key: 'stores',
    label: 'sidebar.stores',
    leftIcon: <FaStore className="anticon" />,
  },
  {
    key: 'plans',
    label: 'sidebar.plans',
    leftIcon: 'ion-flag',
  },
  {
    key: 'regions',
    label: 'sidebar.regions',
    leftIcon: <FaMapMarkerAlt className="anticon" />,
  },
  // {
  //   key: 'store-types',
  //   label: 'sidebar.store-types',
  //   leftIcon: <FaList className="anticon" />,
  // },
  {
    key: 'zones',
    label: 'sidebar.zones',
    leftIcon: <FaCrosshairs className="anticon" />,
  },
  {
    key: 'cities',
    label: 'sidebar.cities',
    leftIcon: <FaCity className="anticon" />,
  },
];

export default options;