import React, { Fragment } from 'react';
import { Collapse, Card } from 'antd';
import ComponentRender from './ComponentRender';

export default function ComponentCategoryCheckDate({ childs, form, images }) {
  return (
    <Fragment>
      {
        childs.map((item) => (
          <Card key={item.component_code} title={item.label} type="inner">
            <ComponentRender {...item} form={form} images={images} />
          </Card>
        ))
      }
    </Fragment>
    // <Collapse>
    //   {
    //     childs.map((item) => (
    //       <Collapse.Panel key={item.component_code} header={item.label}>
    //         <ComponentRender {...item} form={form} images={images} />
    //       </Collapse.Panel>
    //     ))
    //   }
    // </Collapse>
  );
}