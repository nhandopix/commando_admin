import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UploadOutlined, InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Tooltip, Button, Modal, Form, Upload, Alert, Switch, Popconfirm } from 'antd';

import { Notification } from '../../../components';

import { handleImport } from '../actions';

function ButtonImport({ importType, titleModal, children = 'IMPORT' }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [showFileName, setShowFileName] = useState(null);

  const onClickVisible = () => {
    setVisible(true);
  };

  const onClickCancel = () => {
    setVisible(false);
    setShowFileName(null);
    form.resetFields();
  };

  const checkFile = (rule, value) => {
    if (value) {
      const { name, type } = value.file;

      if (type !== 'application/vnd.ms-excel' && type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setShowFileName(null);
        return Promise.reject('Vui lòng chọn đúng định dạng file');
      }

      setShowFileName(name);
      return Promise.resolve();
    }

    return Promise.reject('Vui lòng chọn file để upload');
  };

  const onClickSubmit = () => {
    form.validateFields().then(values => {
      onFinish(values);
    }).catch(error => {
      console.log('Validate Failed:', error);
    });
  };

  const onFinish = (values) => {
    const { is_replace_data } = values;
    const { file } = values.file;
    const dataForm = new FormData();

    dataForm.append('files', file);
    dataForm.append('import_type', importType);
    dataForm.append('is_replace_data', is_replace_data);

    dispatch(handleImport(dataForm, ({ error, message, description }) => {
      if (error) {
        Notification('error', message)
      } else {
        Notification('success', message, description);
      }
      onClickCancel();
    }));
  };

  const onChangeReplaceImport = (value) => {

    if (value) {
      Modal.confirm({
        title: 'Ghi đè dữ liệu nhập vào?',
        icon: <ExclamationCircleOutlined />,
        content: 'Dữ liệu cũ sẽ được thay thế bằng dữ liệu mới',
        onOk() { },
        onCancel() {
          form.setFieldsValue({ is_replace_data: false })
        }
      });
    }
  }

  return (
    <Fragment>
      <Modal
        title={titleModal}
        visible={visible}
        width={640}
        onCancel={onClickCancel}
        footer={[
          <Button key="submit" type="primary" onClick={onClickSubmit}>Tải lên</Button>,
          <Button key="back" onClick={onClickCancel}>Đóng</Button>
        ]}
      >
        <Form
          form={form}
          initialValues={{
            is_replace_data: false
          }}
        >
          <Form.Item
            name="file"
            rules={[
              { required: true, validator: checkFile }
            ]}
          >
            <Upload.Dragger
              name="file"
              multiple={false}
              accept=".csv, .xlsx"
              showUploadList={false}
              fileList={false}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Nhấp hoặc kéo tệp vào đây để tải lên</p>
            </Upload.Dragger>
          </Form.Item>
          {showFileName && (<Alert message={showFileName} type="success" showIcon />)}

          <Form.Item
            label="Ghi đè dữ liệu import"
            name="is_replace_data"
            valuePropName="checked"
            rules={[
              { required: false }
            ]}
          >
            <Switch onChange={onChangeReplaceImport} />
          </Form.Item>
        </Form>
      </Modal>

      <Tooltip placement="bottom" title="Import file mẫu">
        <Button
          type="danger"
          size="large"
          icon={<UploadOutlined />}
          onClick={onClickVisible}
        >{children}</Button>
      </Tooltip>
    </Fragment>
  );
}

ButtonImport.propTypes = {
  importType: PropTypes.string.isRequired,
  titleModal: PropTypes.string
};

ButtonImport.defaultProps = {
  titleModal: 'Import'
};

export default React.memo(ButtonImport);