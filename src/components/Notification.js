import React from 'react';
import { notification } from 'antd';
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle
} from 'react-icons/fa';

const NOTI = {
  info: {
    icon: <FaInfoCircle />,
    color: '#2f96b4'
  },
  success: {
    icon: <FaCheckCircle />,
    color: '#51a351'
  },
  warning: {
    icon: <FaExclamationCircle />,
    color: '#f89406'
  },
  error: {
    icon: <FaTimesCircle />,
    color: '#bd362f'
  }
};

export default function Notification(type, message = '', description = '', duration = 3) {
  notification[type]({
    message,
    description,
    duration,
    icon: NOTI[type].icon,
    style: { backgroundColor: NOTI[type].color }
  });
}