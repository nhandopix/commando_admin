import React from 'react';
import styled from 'styled-components';
import { Row, Col, Form } from 'antd';
import { validateMessages } from '../../../utils/helpers';
import { Note, NoteUnsuccess, QuestionAnswer, Survey, ExpiredDate, Camera, Facing } from '../components';

const BoxWrapper = styled.div`
  max-height: 800px;
  overflow: auto;
  .ant-form-item-label > label {
    height: auto;
    white-space: normal;
  }

  & > .ant-card-small > .ant-card-head {
    color: #fff;
    background-color: #007eb3;
  }
`;


function PlanData({ planData, images, isCorrective, planSid, handleReload }) {
  const [form] = Form.useForm();
  const filterImages = images.filter((item) => item.is_corrective === isCorrective);
  // console.log('Plan Data component: ', planData, images, isCorrective);

  return (
    <Form
      form={form}
      size="small"
      layout="horizontal"
      validateMessages={validateMessages}
      colon={false}
    >
      <Row gutter={[24, 24]}>
        <Col span={24} lg={10}>
          <BoxWrapper>
            {
              planData.issues['SURVEY'] && (<Survey {...planData.issues['SURVEY']} form={form} status={planData.store.status} />)
            }
            {
              planData.issues['FACING'] && (<Facing {...planData.issues['FACING']} status={planData.store.status} storeTypeCode={planData.store.store_type_code} />)
            }
            {
              planData.issues['EXPIRED_DATE'] && (<ExpiredDate {...planData.issues['EXPIRED_DATE']} form={form} images={images} status={planData.store.status} />)
            }
            {
              planData.issues['QUESTION_ANSWER'] && (<QuestionAnswer {...planData.issues['QUESTION_ANSWER']} form={form} status={planData.store.status} />)
            }
            {
              planData.issues['NOTE'] && (<Note {...planData.issues['NOTE']} form={form} status={planData.store.status} />)
            }
            {
              planData.issues['NOTE_UNSUCCESS'] && (<NoteUnsuccess {...planData.issues['NOTE_UNSUCCESS']} form={form} status={planData.store.status} />)
            }

          </BoxWrapper>
        </Col>

        <Col span={24} lg={14}>
          <BoxWrapper>
            {
              planData.issues['CAMERA'] && (<Camera {...planData.issues['CAMERA']} images={filterImages} status={planData.store.status} planSid={planSid} handleReload={handleReload} />)
            }
          </BoxWrapper>
        </Col>
      </Row>
    </Form>
  );
}

export default React.memo(PlanData)