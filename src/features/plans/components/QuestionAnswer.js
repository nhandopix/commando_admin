import React, { Fragment } from 'react';
import { Card } from 'antd';
import { TitleBox } from '../../../assets/styles';
import ComponentRender from './ComponentRender';

export default function QuestionAnswer({ issue_name, items, form, status, store_status }) {
  return (
    <Fragment>
      {
        store_status.includes(status) && (
          <Card title={issue_name} size="small" style={{ width: "100%" }}>
                {
                  items.map((item) => <ComponentRender key={item.component_code} {...item} form={form} />)
                }
          </Card>
        )
      }
    </Fragment>
  );
}