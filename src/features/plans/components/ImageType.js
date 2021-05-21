import PropTypes from 'prop-types';
import React from 'react';
import { Card, Row } from 'antd';

import ImagePerType from './ImagePerType';

export default function ImageType({ data, images, handleClickDelete, handleClickSave }) {
  return (
    <Card title={data.label} headStyle={{ fontSize: 20 }}>
      {
        images.length > 0 ? (
          <Row gutter={[24, 24]}>
            <ImagePerType
              images={images}
              handleClickDelete={handleClickDelete}
              handleClickSave={handleClickSave}
            />
          </Row>
        ) : <p>Không có hình ảnh.</p>
      }
    </Card>
  )
}

ImageType.propTypes = {
  images: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func,
  handleClickSave: PropTypes.func,
};

ImageType.defaultProps = {
  images: [],
  data: {},
  handleClickDelete: () => { },
  handleClickSave: () => { }
};