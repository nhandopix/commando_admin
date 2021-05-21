import React, { useState } from 'react'
import { Form, Select, Input, Col, Row, Checkbox, Typography } from 'antd';
import { TitleBox } from '../../../assets/styles';

function CheckQC({ isDisabled, reasonError, reasonErrorGroup }) {
  const [data] = useState(() => {
    // Improve ==> function
    const obj = {};

    reasonErrorGroup.forEach((group) => {
      const key = group.code;

      if (!obj[key]) {
        obj[key] = { data: [], label: group.label }
      }

      const filterByGroupCode = reasonError.filter((item) => item.group_code === key);

      obj[key].data = filterByGroupCode;
    });

    return obj;
  });

  const renderErrorReasons = () => {
    return reasonErrorGroup.map((group) => {
      const options = data[group.code].data.map(({ id, label }) => {
        return {
          value: id,
          label
        };
      });

      return (
        <Col span={24} md={12} xxl={6} key={group.code}>
          <Typography.Title type="danger" level={3}>{data[group.code].label}</Typography.Title>
          <Form.Item name={group.code}>
            <Checkbox.Group options={options} />
          </Form.Item>
        </Col>
      );
    });
  };

  return (
    <Col span={24} lg={24}>
      <div className="formBox">
        <TitleBox>Check QC</TitleBox>
        <div className="formBoxContent">
          <Form.Item
            name="qc_status"
            rules={[
              { required: true, message: 'Vui lòng check QC' }
            ]}
          >
            <Select placeholder="Check QC" disabled={isDisabled}>
              <Select.Option value="AWAIT" disabled>AWAIT</Select.Option>
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
                <Row gutter={[24, 24]}>
                  {renderErrorReasons()}

                  <Col span={24} md={12} xxl={6}>
                    <Typography.Title type="danger" level={3}>Lỗi khác</Typography.Title>
                    <Form.Item
                      name="qc_note"
                    // label="Note lỗi"
                    // rules={[
                    //   { required: true, message: 'Vui lòng nhập lỗi' }
                    // ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null
            }
          </Form.Item>

        </div>
      </div>
    </Col>
  );
}

export default React.memo(CheckQC);