import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Col, Card, Button, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function ImageItem({ index, id, image_type_id, file, handleClickImage, items = [] }) {
  const { role } = useSelector((state) => state.auth.userInfo);

  return (
    <Col span={24} sm={{ span: 12 }} lg={{ span: 12 }}>
      <CardWrapper>
        <Card
          hoverable
          cover={
            <img
              alt=""
              src={file || `https://via.placeholder.com/300x300?text=${image_type_id}-${id}`}
              onClick={(event) => handleClickImage(index, event)}
            />
          }
          actions={[
            role === 'SUPER_ADMIN' && (
              <Button
                icon={<DeleteOutlined />}
                type="danger"
                size="large"
                style={{ marginTop: 12, marginBottom: 12 }}
              // onClick={(event) => handleClickDelete(id, event)}
              />
            )
          ]}
        >
          {
            items.length > 0 ? (
              <Select style={{ width: '100%' }} defaultValue={image_type_id} disabled>
                {
                  items.map((item) => (
                    <Select.Option value={item.type_id} key={item.type_id}>{item.type_name}</Select.Option>
                  ))
                }
              </Select>
            ) : null
          }
        </Card>
      </CardWrapper>
    </Col>
  );
}

ImageItem.propTypes = {
  handleClickImage: PropTypes.func,
  // handleClickDelete: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.number,
  image_type_id: PropTypes.number,
  file: PropTypes.string
};

const CardWrapper = styled.div`
  text-align: center;

  .ant-card-cover {
    position: relative;
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .ant-card-bordered {
    border: none;
  }

  /* .ant-card-body {
    display: none;
  } */

  .ant-card-actions {
    border-top: 0;
    > li {
      margin: 0;
    }
  }
`;
