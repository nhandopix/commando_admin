import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Form, Input, Switch, Space, Spin } from 'antd';

import { LayoutWrapper, TitleWrapper, TitleHeader, TitleBox, BoxWrapper, formItemLayout, tailFormItemLayout } from '../../../assets/styles';
import { validateMessages } from '../../../utils/helpers';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
// import { Notification } from '../../../components';

// import { handleCreate } from '../actions';

export default function RegionCreate() {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    console.log('values: ', values);
    // setIsLoading(true)
    // dispatch(handleCreate(convertValues, ({ error, message }) => {
    //   setIsLoading(false);
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     Notification('success', message);
    //     setTimeout(() => {
    //       history.goBack();
    //     }, 1000);
    //   }
    // }));
  };

  return (
    <LayoutWrapper>
      <TitleWrapper>
        <TitleHeader>Chỉnh sửa Store Type</TitleHeader>
      </TitleWrapper>

      <BoxWrapper>
        <Form
          {...formItemLayout}
          form={form}
          size="large"
          initialValues={{
            is_active: false
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <div className="formBox">
            <TitleBox>Thông tin cơ bản</TitleBox>
            <div className="formBoxContent">
              <Spin spinning={isLoading}>
                <Form.Item
                  name="code"
                  label="CustomerCode"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="code"
                  label="SmollanCode"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="label"
                  label="Name"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="is_active"
                  label="Active"
                  valuePropName="checked"
                  rules={[
                    { required: false }
                  ]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Space size={10}>
                    <ButtonSave />
                    <ButtonCancel />
                  </Space>
                </Form.Item>
              </Spin>
            </div>
          </div>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}