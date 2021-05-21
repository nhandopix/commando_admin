import React, { Fragment, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Modal } from 'antd';

function ButtonCheckQC({ onClickCheckQC, ...otherProps }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onClickCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onClickSubmit = () => {
    form.validateFields().then(values => {
      const convertValues = {
        ...values,
        qc_note: values.qc_note || null
      };

      onClickCheckQC(convertValues);

      form.resetFields();
      setVisible(false);
    }).catch(error => {
      console.log('Validate Failed:', error);
    });
  };

  const onClickOpenModal = () => {
    setVisible(true);
  };

  return (
    <Fragment>
      <Modal
        title="Vui lòng chọn để Check QC"
        visible={visible}
        onCancel={onClickCancel}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={onClickSubmit}>Đồng ý</Button>,
          <Button key="back" size="large" onClick={onClickCancel}>Đóng</Button>
        ]}
      >
        <Form form={form} layout="vertical" size="large">
          <Form.Item
            name="qc_status"
            rules={[
              { required: true, message: 'Vui lòng check QC' }
            ]}
          >
            <Select placeholder="Check QC">
              <Select.Option value="PASSED">PASSED</Select.Option>
              <Select.Option value="FAILED">FAILED</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.qc_status !== currentValues.qc_status}
          >
            {({ getFieldValue }) =>
              getFieldValue('qc_status') === 'FAILED' ? (
                <Form.Item
                  name="qc_note"
                  label="Note lỗi"
                  rules={[
                    { required: true, message: 'Vui lòng nhập lỗi' }
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </Form>
      </Modal>

      <Button
        size="large"
        icon={<CheckOutlined />}
        {...otherProps}
        onClick={onClickOpenModal}
      >
        Check QC
    </Button>
    </Fragment>
  );
}

export default React.memo(ButtonCheckQC);