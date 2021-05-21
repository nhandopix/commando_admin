import React, { Fragment } from 'react';
import { Form, Radio } from 'antd';
import ComponentRender from './ComponentRender';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../constants';

export default function ComponentRadio({ component_type, component_code, label, validate, value, options, form, actions, childs }) {
  const { role } = useSelector((state) => state.auth.userInfo);

  form.setFieldsValue({
    [`${component_type}_${component_code}`]: value
  });

  return (
    <Fragment>
      <Form.Item
        name={`${component_type}_${component_code}`}
        label={label}
        rules={[{ required: validate.required }]}
      >
        <Radio.Group options={options} disabled={(role===ROLE.GUEST)} />
      </Form.Item>

      {actions && (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            return (
              prevValues[`${component_type}_${component_code}`] !==
              currentValues[`${component_type}_${component_code}`]
            );
          }}
        >
          {({ getFieldValue }) =>
            getFieldValue(`${component_type}_${component_code}`) ===
            actions[0].value
              ? childs.map((child) => {
                  return <ComponentRender {...child} form={form} />;
                })
              : null
          }
        </Form.Item>
      )}
    </Fragment>
  );
}