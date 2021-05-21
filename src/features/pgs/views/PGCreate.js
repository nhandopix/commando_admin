import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Switch, Space, Spin } from 'antd';

import { Notification, TitlePage } from '../../../components';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { checkVNPhone, validateMessages } from '../../../utils/helpers';
import { LayoutWrapper, TitleBox, BoxWrapper, formItemLayout, tailFormItemLayout } from '../../../assets/styles';

import { handleCreate } from '../actions';

export default function PGCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    const convertValues = {
      ...values,
      birth_date: values['birth_date'].format('YYYY-MM-DD'),
      date_joined: new Date()
    };

    setIsLoading(true)
    dispatch(handleCreate(convertValues, ({ error, message }) => {
      setIsLoading(false);
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }));
  };

  return (
    <LayoutWrapper>
      <TitlePage name="MER" type="create" />

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
                  name="username"
                  label="Username"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="full_name"
                  label="Full name"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { type: 'email' },
                    { required: true }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone_number"
                  label="Phone number"
                  rules={[
                    { required: true },
                    { validator: checkVNPhone }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="birth_date"
                  label="Birth date"
                  rules={[
                    { required: true }
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm_password"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
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