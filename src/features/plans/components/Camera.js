import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Collapse } from 'antd';
import ImagePerType from './ImagePerType';
import ImageCreate from './ImageCreate';

export default function Camera({ issue_name, items, images, status, store_status, planSid, handleReload = () => { } }) {
  const { role } = useSelector((state) => state.auth.userInfo);
  const filterItems = items.filter((item) => item.store_status.includes(status));
  const planImages = items.filter((item) => item.store_status.includes(status));

  return (
    <Fragment>
      {
        store_status.includes(status) && (
          <Card title={issue_name} size="small" style={{ width: "100%" }}>
            {
              role === 'ADMIN' && (<ImageCreate planSid={planSid} planImages={planImages} handleReload={handleReload} />)
            }

            <Row gutter={[24, 24]}>
              <ImagePerType images={images} items={filterItems} />
            </Row>
            {/* <Collapse>
              {
                items.map((item) => {
                  return item.store_status.includes(status) ? (
                    <Collapse.Panel key={item.type_id} header={`${item.type_name} (${item.value.length})`}>
                      {
                        images[item.type_id]?.length ? (
                          <Row gutter={[24, 24]}>
                            <ImagePerType images={images[item.type_id]} />
                          </Row>
                        ) : <p>Không có hình ảnh</p>
                      }
                    </Collapse.Panel>
                  ) : null
                })
              }
            </Collapse> */}
          </Card>
        )
      }
    </Fragment>
  );
}