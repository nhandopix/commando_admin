import React from 'react';
import ImagePerType from './ImagePerType';
import { Card, Row } from 'antd';

function ComponentButtonTakePicture(props) {
  const { images, image_type_id } = props;

  return (
    <Card title="Hình ảnh">
      {
        images[image_type_id]?.length ? (
          <Row gutter={[24, 24]}>
            <ImagePerType images={images[image_type_id]} />
          </Row>
        ) : <p>Không có hình ảnh</p>
      }
    </Card>

  );
}

export default ComponentButtonTakePicture;