import React, { Fragment } from 'react';
import { Card, Collapse } from 'antd';
import Planogram from './Planogram';

export default function Facing({ issue_name, items, status, store_status, storeTypeCode }) {
  const filterByStoreTypeCode = items.filter((item) => {
    return item.store_types.includes(storeTypeCode);
  });

  return (
    <Fragment>
      {
        store_status.includes(status) && (
          <Card title={issue_name} size="small" style={{ width: "100%" }}>
            {
              filterByStoreTypeCode.map((item, index) => {
                return (
                  <Card
                    key={item.planogram_id}
                    type="inner"
                    title={`${item.planogram_name} (${item.value === 1 ? 'SUCCESS' : 'UNSUCCESS'})`}
                  >
                    {
                      item.value === 1 ? (<Planogram  {...item} path={`issues.FACING.items.${index}`} />) : <p>Không có dữ liệu</p>
                    }
                  </Card>
                )
              })
            }
            {/* <Collapse>
              {
                items.map((item) => {
                  return (
                    <Collapse.Panel key={item.planogram_id} header={`${item.planogram_name} (${item.value === 1 ? 'SUCCESS' : 'UNSUCCESS'})`}>
                      {
                        item.value === 1 ? (<Planogram  {...item} />) : <p>Không có dữ liệu</p>
                      }
                    </Collapse.Panel>
                  )
                })
              }
            </Collapse> */}
          </Card>
        )
      }
    </Fragment>
  );
}