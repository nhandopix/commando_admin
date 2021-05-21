import React, { Fragment } from 'react';
import { Form, Select } from 'antd';
import ComponentRender from './ComponentRender';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../constants';


function ComponentSelect({ component_type, component_code, label, validate, value, options, form, actions, childs }) {
  const { role } = useSelector((state) => state.auth.userInfo);
  
  form.setFieldsValue({
    [`${component_type}_${component_code}`]: value
  });

  return (
    <Fragment>
      <Form.Item
        name={`${component_type}_${component_code}`}
        label={label}
        labelCol={{ span: 12 }}
        labelAlign="left"
        rules={[
          { required: validate.required }
        ]}
      >
        <Select
          disabled={(role===ROLE.GUEST)}
        >
          {
            options.map((item) => (
              <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>


      {/* {
        actions && (
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues[`${component_type}_${component_code}`] !== currentValues[`${component_type}_${component_code}`]
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue(`${component_type}_${component_code}`) === actions[0].value ? (
                childs.map((child) => {
                  console.log('child: ', child);

                  return <ComponentRender {...child} form={form} />
                })
              ) : null
            }
          </Form.Item>
        )
      } */}
    </Fragment>

  );
}

export default ComponentSelect
