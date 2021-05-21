import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';

import ImageType from './ImageType';
import { Notification } from '../../../components'

import { handleRotateImage } from '../actions';

export default function ImageList({ images, planSid, handleReload }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const handleClickDelete = (id, event) => {
    console.log('handleClickDelete ImageType ImagePerTypeImageList: ', id, event);
    setData({
      id,
      type: 'DELETE_IMAGE',
      title: 'Xác nhận xóa hình?'
    });
    setVisible(true);
  };

  const handleClickSave = (data) => {
    console.log('handleClickSave: ', data);
    setData({
      ...data,
      type: 'ROTATE_IMAGE',
      title: 'Xác nhận xoay hình?'
    })
    setVisible(true);
  };

  const handleSaveRotate = () => {
    const convertData = {
      plan_file_id: data.plan_file_id,
      plan_sid: planSid,
      data: {
        angle: -data.angle
      }
    };

    dispatch(handleRotateImage(convertData, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        handleReload(data); // reload API
      }

      onClickCancel();
    }));
  };

  const onClickCancel = () => {
    setVisible(false);
  };

  const onClickOk = () => {
    switch (data.type) {
      case 'DELETE_IMAGE':
        alert('DELETE' + data.id);
        break;

      case 'ROTATE_IMAGE':
        handleSaveRotate();
        break;

      default:
        break;
    }
  };

  const renderImageType = () => {
    return images.map((item, index) => {
      const marginTop = index === 0 ? 0 : 30;
      return (
        <div style={{ marginTop }} key={item.data?.id}>
          <ImageType
            {...item}
            handleClickDelete={handleClickDelete}
            handleClickSave={handleClickSave}
          />
        </div>
      );
    });
  };

  return (
    <Fragment>
      <Modal
        visible={visible}
        onOk={onClickOk}
        onCancel={onClickCancel}
        width={300}
        closable={false}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={onClickOk}>CÓ</Button>,
          <Button key="back" onClick={onClickCancel}>KHÔNG</Button>,
        ]}
      >
        <h1 style={{ fontSize: 25 }}>{data.title}</h1>
      </Modal>

      {renderImageType()}
    </Fragment>
  )
}

ImageList.propTypes = {
  images: PropTypes.array.isRequired,
  planSid: PropTypes.string.isRequired,
  handleReload: PropTypes.func
};

ImageList.defaultProps = {
  images: [],
  handleReload: () => { }
};
