import React from 'react';
import { FaStore } from 'react-icons/fa';

export const ROLE_OPTIONS = {
  GUEST: [
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
  ],
  AUDITOR: [
    {
      key: 'plans',
      label: 'sidebar.plans',
      leftIcon: 'ion-flag',
    },
  ]
};