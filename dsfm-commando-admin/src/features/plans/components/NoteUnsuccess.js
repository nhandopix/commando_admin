import React, { Fragment } from 'react';
import { Card, Col } from 'antd';
import ComponentRender from './ComponentRender';

export default function NoteUnsuccess({ issue_name, items, form, status, store_status }) {
  return (
    <Fragment>
      {
        store_status.includes(status) && (

          // <Col span={24} lg={12}>
          <Card title={issue_name} size="small" style={{ width: "100%" }}>
            {
              items.map((item) => <ComponentRender key={item.component_code} {...item} form={form} />)
            }
          </Card>
          // </Col>
        )
      }
    </Fragment>
  );
}