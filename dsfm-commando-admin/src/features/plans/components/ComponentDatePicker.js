import React from 'react'
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../constants';

export default function ComponentDatePicker({ component_type, component_code, label, validate, value, form }) {
  const { role } = useSelector((state) => state.auth.userInfo);

  form.setFieldsValue({
    [`${component_type}_${component_code}`]: value ? moment(value, 'DD/MM/YYYY') : null
  });


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
      <DatePicker format="DD-MM-YYYY" disabled={(role===ROLE.GUEST)} />
    </Form.Item>
  );
}