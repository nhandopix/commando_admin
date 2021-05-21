import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Switch, Space, Spin } from 'antd';

import { Notification, Loader, TitlePage } from '../../../components';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { checkVNPhone, validateMessages } from '../../../utils/helpers';
import { LayoutWrapper, TitleBox, BoxWrapper, formItemLayout, tailFormItemLayout } from '../../../assets/styles';

import { handleGetDetail, handleUpdate } from '../actions';

export default function PGCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [PG, setPG] = useState(null);

  useEffect(() => {
    dispatch(handleGetDetail(id, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setPG(data);

        const { username, full_name, email, phone_number, is_active, birth_date } = data;

        form.setFieldsValue({
          username,
          full_name,
          email,
          phone_number,
          is_active,
          birth_date: moment(birth_date, 'YYYY/MM/DD')
        });
      }
    }));
  }, []);

  const onFinish = (values) => {
    const convertValues = {
      ...values,
      birth_date: values['birth_date'].format('YYYY-MM-DD'),
      id
    };
    if (!convertValues.password) {
      delete convertValues.password;
    }

    setIsLoading(true);
    dispatch(handleUpdate(convertValues, ({ error, message }) => {
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

  if (!PG) {
    return <Loader />
  }

  return (
    <LayoutWrapper>
      <TitlePage name="MER" type="edit" />

      <BoxWrapper>
        <Form
          {...formItemLayout}
          form={form}
          size="large"
          initialValues={{
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
                    { required: false }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="is_active"
                  label="Active"
                  rules={[
                    { required: false }
                  ]}
                  valuePropName="checked"
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