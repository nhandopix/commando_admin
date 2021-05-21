import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Space, Button, Modal, Col } from 'antd';

import { GoogleMaps } from '../../../components';
import { TitleBox } from '../../../assets/styles';
import { getFullTime } from '../../../utils/helpers';

function TimeTrackings({ timeTrackings = [], isCorrective }) {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [visible, setVisible] = useState(false);

  const renderTimeTrackings = () => {
    return timeTrackings.filter((item) => item.is_corrective === isCorrective).map((item) => {
      return (
        <Col key={item.id}>
          <Space>
            {item.tracking_type === 'CHECK_IN' ? <h3>Check in:</h3> : <h3>Checkout:</h3>}
            <Button type="link" onClick={() => onClickOpenMap(item.lat, item.lng)}>{`${item.lat} - ${item.lng}`}</Button>
            <strong>{getFullTime(item.created_at).date_time}</strong>
          </Space>
        </Col>
      )
    });
  };

  const onClickOpenMap = (lat, lng) => {
    setVisible(true);
    setLocation({ lat, lng });
  };

  const onClickCloseMap = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      <Modal
        centered
        title="MAPS"
        width={960}
        visible={visible}
        onCancel={onClickCloseMap}
        footer={[
          <Button key="back" onClick={onClickCloseMap}>Close</Button>
        ]}
      >
        <GoogleMaps location={location} />
      </Modal>

      {/* <div className="formBox">
        <TitleBox>Time Trackings</TitleBox>
        <div className="formBoxContent" style={{ padding: '0 30px 30px 30px' }}> */}
      {
        timeTrackings.length === 0 ? (
          <h3>Không có thông tin.</h3>
        ) : renderTimeTrackings()
      }
      {/* </div>
      </div> */}
    </Fragment>
  );
}

TimeTrackings.propTypes = {
  timeTrackings: PropTypes.array.isRequired
};

export default React.memo(TimeTrackings);