import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../constants';

function ComponentText({ component_type, component_code, label, validate, value, keyboard_type, form }) {
  const { role } = useSelector((state) => state.auth.userInfo);
  form.setFieldsValue({
    [`${component_type}_${component_code}`]: value
  });

  let input = <Input disabled={role === ROLE.GUEST} />;
  if (keyboard_type === 'numeric') {
    input = <InputNumber disabled={role === ROLE.GUEST} />;
  }

  return (
    <Form.Item
      name={`${component_type}_${component_code}`}
      label={label}
      labelCol={{ span: 12 }}
      labelAlign="left"
      rules={[
        { required: validate.required }
      ]}
    >
      {input}
    </Form.Item>
  );
}

export default ComponentText
