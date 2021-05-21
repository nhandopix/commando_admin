import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Select, Upload, Spin } from 'antd';

import { Notification } from '../../../components';

import { handleCreateImageFiles } from '../actions';

export default function ImageCreate({ planSid, planImages, handleReload = () => { } }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState(null);

  const onClickOpen = () => {
    setVisible(true);
  };

  const onClickCancel = () => {
    setVisible(false);
    setBase64(null);
    form.resetFields();
  };

  const checkImage = (rule, value) => {
    if (value) {
      const { type } = value.file;

      if (type !== 'image/jpeg' && type !== 'image/png') {
        if (base64) {
          setBase64(null);
        }
        return Promise.reject('Vui lòng chọn đúng định dạng.');
      }

      return Promise.resolve();
    }

    return Promise.reject('Vui lòng chọn hình.');
  };

  const handleBeforeUpload = (file) => {
    console.log('FILE: ', file)

    // if (file.type === 'image/jpeg' || file.type === 'image/png') {
    //   const reader = new FileReader();

    //   reader.addEventListener('loadstart', () => {
    //     setIsLoading(true);
    //   });

    //   reader.addEventListener('load', () => {
    //     setBase64(reader.result);
    //   });

    //   reader.addEventListener('loadend', () => {
    //     setIsLoading(false);
    //   });

    //   reader.readAsDataURL(file);
    // }

    return false;
  };

  const onClickSubmit = () => {
    form.validateFields().then(values => {
      onFinish(values);
    }).catch(error => {
      console.log('Validate Failed:', error);
    });
  };

  const onFinish = (values) => {
    const numOfFile = values.file.fileList.length;
    console.log('numOfFile: ', numOfFile);
    console.log('values', values);
    console.log('values.file', values.file);
    const data = new FormData();
    data.append('plan_sid', planSid);
    data.append('image_type_id', values.plan_image_id);
    // // data.append('pg_sid');
    for (var i = 0; i < numOfFile; i++) {
      data.append('files', values.file.fileList[i].originFileObj);
    }
    // data.append('files', values.file.fileList);

    const convertData = {
      data,
      plan_sid: planSid
    };

    dispatch(handleCreateImageFiles(convertData, ({ error, message, data }) => {
      if (error) {
        Notification('error', message)
      } else {
        Notification('success', message);
        onClickCancel();
        handleReload(data);
      }
    }));
  };

  return (
    <Fragment>
      <Modal
        title="Thêm hình mới"
        visible={visible}
        onCancel={onClickCancel}
        footer={[
          <Button key="submit" type="primary" onClick={onClickSubmit}>Tải lên</Button>,
          <Button key="back" onClick={onClickCancel}>Đóng</Button>
        ]}
      >
        <Form form={form} layout="vertical" size="large">
          <Form.Item
            name="file"
            valuePropName="file"
          // rules={[
          //   { required: true, validator: checkImage }
          // ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              multiple={true}
              accept=".jpeg, .png, .jpg"
              showUploadList={true}
              // fileList={true}
              beforeUpload={handleBeforeUpload}
            >
              <Spin spinning={isLoading}>
                {
                  base64 ? (
                    <img
                      src={base64}
                      alt=""
                      style={{ maxWidth: '100%' }}
                    />
                  ) : (
                      <img
                        src='https://www.bestusatkd.com/wp-content/uploads/2017/04/default-image.jpg'
                        alt=""
                        style={{ maxWidth: '100%' }}
                      />
                    )
                }
              </Spin>
            </Upload>
          </Form.Item>

          <Form.Item
            name="plan_image_id"
            label="Loại hình"
            rules={[
              { required: true, message: 'Vui lòng chọn Loại hình' }
            ]}
          >
            <Select>
              {
                planImages.map((item) => (
                  <Select.Option key={item.type_id} value={item.type_id}>{item.type_name}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Button
          icon={<PictureOutlined />}
          type="primary"
          size="large"
          onClick={onClickOpen}
        >Thêm hình mới</Button>
      </div>
    </Fragment>
  )
}

ImageCreate.propTypes = {
  planImages: PropTypes.array.isRequired,
  planSid: PropTypes.string.isRequired,
  pgSid: PropTypes.string.isRequired,
  handleReload: PropTypes.func
};

ImageCreate.defaultProps = {
  planImages: [],
  handleReload: () => { }
};
