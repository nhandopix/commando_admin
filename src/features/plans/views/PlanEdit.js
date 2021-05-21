import moment from 'moment';
import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Space, Spin, Select, DatePicker, Row, Col, Tag, Modal, Button, Divider } from 'antd';
import { isEmpty } from 'lodash'

import { STATUS_CODE, ROLE, ROLE_PERMISSIONS } from '../../../constants';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { Notification, Loader } from '../../../components';
import { validateMessages } from '../../../utils/helpers';
import { LayoutWrapper, TitleWrapper, TitleHeader, TitleBox, BoxWrapper } from '../../../assets/styles';

import { TimeTrackings, CheckQC } from '../components';
import PlanData from './PlanData';

import { handleGetDetail, handleGetData, handleUpdate, handleGetImageFiles, handleUpdatePlanData, handleCreateCorrectivePlan } from '../actions';
import { handleGetProvinces } from '../../public/actions';
import { handleGetList as handleGetReasonErrorList, handleGetReasonErrorGroupList } from '../../reason-error/actions';

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

const mapValues = (str, objArr) => {
  if (!str) {
    return {};
  }

  const obj = {};
  const convertToArr = str.split(',').map((item) => parseInt(item));

  objArr.forEach((data) => {
    if (convertToArr.includes(data.id)) {
      const key = data.group_code;

      if (!obj[key]) {
        obj[key] = [];
      }

      obj[key].push(data.id);
    }
  });

  return obj;
}

export default function PlanCreate() {
  const { role } = useSelector((state) => state.auth.userInfo);
  const { planData: planUpdateData } = useSelector((state) => state.planData);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true); // Is disabled if different TODO
  const [plan, setPlan] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [images, setImages] = useState(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(null);
  const [dataReload, setDataReload] = useState(null);
  const [reasonError, setReasonError] = useState(null);
  const [reasonErrorGroup, setReasonErrorGroup] = useState(null);
  const [reloadImage, setReloadImage] = useState(null);

  useEffect(() => {
    dispatch(handleGetDetail(id, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setPlan(data);

        const { status, code, campaign_code, start_date, end_date, store, pgs, qc_status, qc_note, is_corrective } = data;

        form.setFieldsValue({
          is_corrective: is_corrective ? 'Có' : 'Không',
          status,
          code: store.code,
          campaign_code,
          start_date: moment(start_date, 'YYYY/MM/DD'),
          end_date: moment(end_date, 'YYYY/MM/DD'),
          store_name: store.name,
          // store_sid: store.sid,
          // region_id: store.region.id,
          region_label: store.region?.label,
          location: store.location,
          province_code: store.province?.code,
          pg_public_id: `${pgs[0].username} - ${pgs[0].full_name}`,
          qc_status,
          qc_note
        });
      }
    }));
  }, [dataReload]);

  useEffect(() => {
    dispatch(handleGetImageFiles(id, { page: 1, page_size: 100 }, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setImages(data);
      }
    }));
  }, [reloadImage])

  useEffect(() => {
    dispatch(handleGetData(id, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        if (data.length) {
          const newData = isEmpty(data[0].data) ? data[0].data_corrective : data[0].data;
          setPlanData(newData);
        } else {
          setPlanData(data);
        }
      }
    }));

    dispatch(handleGetProvinces('VNM', ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinces(data);
      }
    }));

    dispatch(handleGetReasonErrorList({ page_size: 1000 }, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        // const convertData = _.groupBy(data, (item) => {
        //   return item.group_code;
        // });
        // console.log('convertData: ', convertData, data)
        // setReasonError(convertData);

        setReasonError(data);
      }
    }));

    dispatch(handleGetReasonErrorGroupList({ page_size: 100 }, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setReasonErrorGroup(data);
      }
    }));
  }, []);

  const onFinish = (values) => {
    const qc_reason_error = reasonErrorGroup.reduce((acc, group) => {
      return [...acc, ...(values[group.code] || [])];
    }, []).join(',') || null;

    const convertValues = {
      // ...values,
      // start_date: values['start_date'].format('YYYY-MM-DD'),
      // end_date: values['end_date'].format('YYYY-MM-DD'),
      id,
      qc_status: values.qc_status,
      qc_note: values.qc_note || null,
      qc_reason_error
    };
    // console.log('convertValues: ', convertValues)

    dispatch(handleUpdate(convertValues, ({ error, message, data }) => {
      setIsLoading(false);
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        // setDataReload(data);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }));

    // setValues(convertValues);
    // setVisible(true);
  };

  const onClickOk = () => {
    console.log('Values: ', values)
    // setIsLoading(true)
    // dispatch(handleUpdate(values, ({ error, message, data }) => {
    //   setIsLoading(false);
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     Notification('success', message);
    //     setDataReload(data);
    //   }
    // }));

    // setVisible(false);
  };

  const onClickCancel = () => {
    setVisible(false);
  };

  if (plan && isDisabled && plan.status === 'TODO') {
    setIsDisabled(false);
  }

  if (!plan || planData === null || !images || !reasonError || !reasonErrorGroup) {
    return <Loader />
  }

  const onClickUpdateFacing = () => {
    const data = {
      ...planUpdateData,
      plan_sid: id,
    }

    dispatch(handleUpdatePlanData(data, ({ error, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }))
  };

  const onClickCorrectivePlan = () => {
    dispatch(handleCreateCorrectivePlan({ plan_sid: id }, ({ error, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }))
  };

  const handleReload = (data) => {
    setReloadImage(data);
  };

  // console.log('planDetail:====================================', plan)
  return (
    <Fragment>
      <Modal
        visible={visible}
        onOk={onClickOk}
        onCancel={onClickCancel}
        closable={false}
        centered
        footer={[
          <Button key="submit" type="primary" size="large" onClick={onClickOk}>CÓ</Button>,
          <Button key="back" size="large" onClick={onClickCancel}>KHÔNG</Button>,
        ]}
      >
        <h3 style={{ fontSize: 25 }}>Thao tác check QC chỉ thực hiện 1 lần. Bạn có muốn thực hiện?</h3>
      </Modal>
      <LayoutWrapper>
        <TitleWrapper>
          <TitleHeader>Plan Info</TitleHeader>
        </TitleWrapper>

        <BoxWrapper>
          <Spin spinning={isLoading}>
            <Form
              form={form}
              size="small"
              layout="horizontal"
              labelAlign="left"
              initialValues={{
                ...mapValues(plan.qc_reason_error, reasonError)
              }}
              onFinish={onFinish}
              validateMessages={validateMessages}
              labelCol={{ span: 6 }}
            >
              <Row gutter={[24, 24]}>
                <Col span={24} lg={24}>
                  <div className="formBox">
                    <TitleBox>Thông tin cửa hàng</TitleBox>
                    <div className="formBoxContent">
                      <Row gutter={[48, 0]}>
                        <Col span={24} lg={12}>
                          <Form.Item
                            name="campaign_code"
                            label="Campaign"
                            rules={[{ required: true }]}
                          >
                            <Input disabled />
                          </Form.Item>

                          <Form.Item
                            name="start_date"
                            label="Start date"
                            rules={[
                              { required: true }
                            ]}
                          >
                            <DatePicker format="DD-MM-YYYY" disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="end_date"
                            label="End date"
                            rules={[
                              { required: true }
                            ]}
                          >
                            <DatePicker format="DD-MM-YYYY" disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="store_name"
                            label="Store"
                            rules={[{ required: true }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="code"
                            label="Smollan code"
                            rules={[{ required: true }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="is_corrective"
                            label="Là Plan khắc phục"
                            rules={[{ required: true }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>
                        </Col>


                        <Col span={24} lg={12}>
                          {
                            (planData && planData?.length !== 0) && (
                              <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[
                                  { required: false }
                                ]}
                                initialValue={planData.store.status}
                              >
                                <Select disabled>
                                  <Select.Option value="SUCCESS">Thành công</Select.Option>
                                  <Select.Option value="UNSUCCESS">Không thành công</Select.Option>
                                </Select>
                              </Form.Item>
                            )
                          }

                          <Form.Item
                            name="status"
                            label="Status"
                            rules={[
                              { required: false }
                            ]}
                          >
                            <Select
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                              }
                              disabled={isDisabled}
                            >
                              {
                                STATUS_CODE.map((item) => (
                                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                ))
                              }
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="region_label"
                            label="Region"
                            rules={[{ required: false }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="province_code"
                            label="Province"
                            rules={[
                              { required: false }
                            ]}
                          >
                            <Select
                              allowClear
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                              }
                              disabled
                            >
                              {
                                provinces.map((item) => (
                                  <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
                                ))
                              }
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: false }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>

                          <Form.Item
                            name="pg_public_id"
                            label="Mer"
                            rules={[{ required: true }]}
                          >
                            <Input disabled={isDisabled} />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Divider orientation="left" >Time Tracking</Divider>
                          <TimeTrackings timeTrackings={plan.timetrackings} isCorrective={plan.is_corrective} />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row gutter={[24, 24]}>
                {
                  (planData && planData?.length !== 0) && (
                    <Col span={24}>
                      <PlanData
                        planData={planData}
                        images={images}
                        isCorrective={plan.is_corrective}
                        planSid={plan.sid}
                        handleReload={handleReload}
                      />

                      {
                        role !== 'GUEST' && (
                          <div style={{ textAlign: 'center' }}>
                            <Button onClick={onClickUpdateFacing} danger type="primary">CẬP NHẬT FACING</Button>
                          </div>
                        )
                      }

                    </Col>
                  )
                }
              </Row>

              {
                plan.status === 'DONE' ? (
                  <Fragment>
                    <Row gutter={[24, 24]}>
                      <CheckQC
                        isDisabled={ROLE_PERMISSIONS.NOT_CHECK_QC.includes(role) || (role === 'AUDITOR' && plan.qc_status !== 'AWAIT')}
                        reasonError={reasonError}
                        reasonErrorGroup={reasonErrorGroup}
                      />
                      {/* Đang test */}
                      <Col span={24}>
                        <div style={{ textAlign: "center" }}>
                          {
                            !(ROLE_PERMISSIONS.NOT_CHECK_QC.includes(role) || (role === 'AUDITOR' && plan.qc_status !== 'AWAIT')) && (
                              <ButtonSave />
                            )
                          }
                          <ButtonCancel />
                        </div>
                      </Col>
                    </Row>

                    {
                      (role !== 'GUEST' && !plan.is_corrective) && (
                        <Row gutter={[24, 24]}>
                          <Col span={24} lg={24}>
                            <div className="formBox">
                              <TitleBox>Khắc phục</TitleBox>
                              <div className="formBoxContent" style={{ textAlign: 'center' }}>
                                <Button type="primary" danger onClick={onClickCorrectivePlan}>Đánh khắc phục</Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      )
                    }
                  </Fragment>
                ) : (
                    <Row gutter={[24, 24]}>
                      <Col span={24} lg={24} style={{ textAlign: 'center' }}>
                        <ButtonCancel />
                      </Col>
                    </Row>
                  )
              }
            </Form>
          </Spin>
        </BoxWrapper>
      </LayoutWrapper>
    </Fragment>
  );
}