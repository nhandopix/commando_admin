import React, { Fragment } from 'react';
import { Card, Collapse } from 'antd';
import ComponentRender from './ComponentRender';

const groupImageByTypeId = (data) => {
  let imagesbytype = {};

  data.forEach(item => {
    let image_key = item.image_type_id;
    if (!imagesbytype[image_key]) {
      imagesbytype[image_key] = [];
    }

    imagesbytype[image_key].push(item);
  });

  return imagesbytype;
};

export default function ExpiredDate({ issue_name, items, form, images, status, store_status }) {
  const convertImages = groupImageByTypeId(images);

  return (
    <Fragment>
      {
        store_status.includes(status) && (
          <Card title={issue_name} size="small" style={{ width: "100%" }}>
            {
              items.map((item) => (
                <Card key={item.component_code} type="inner" title={`CATEGORY: ${item.label}`}>
                  <ComponentRender {...item} form={form} images={convertImages} />
                </Card>
              ))
            }
            {/* <Collapse>
              {
                items.map((item) => (
                  <Collapse.Panel key={item.component_code} header={`CATEGORY: ${item.label}`}>
                    <ComponentRender {...item} form={form} images={convertImages} />
                  </Collapse.Panel>
                ))
              }
            </Collapse> */}
          </Card>
        )
      }
    </Fragment>
  );
}