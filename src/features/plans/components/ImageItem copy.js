import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Col, Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function ImageItem({ index, id, plan_image_id, file, handleClickImage, handleClickDelete }) {
  const { role } = useSelector((state) => state.auth.userInfo);
  console.log('role: ', role)


  return (
    <Col xl={{ span: 6 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={24}>
      <CardWrapper>
        <Card
          hoverable
          cover={
            <img
              alt=""
              src={file || `https://via.placeholder.com/300x300?text=${plan_image_id}-${id}`}
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
                onClick={(event) => handleClickDelete(id, event)}
              />
            )
          ]}
        />
      </CardWrapper>
    </Col>
  );
}

ImageItem.propTypes = {
  handleClickImage: PropTypes.func,
  handleClickDelete: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.number,
  plan_image_id: PropTypes.number,
  file: PropTypes.string
};

ImageItem.defaultProps = {
  handleClickDelete: () => { }
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

  .ant-card-body {
    display: none;
  }

  .ant-card-actions {
    border-top: 0;
    > li {
      margin: 0;
    }
  }
`;
