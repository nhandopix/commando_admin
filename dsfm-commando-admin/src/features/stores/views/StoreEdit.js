import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Switch, Space, Spin, Select, Row, Col, List, Typography, Divider } from 'antd';
import { ROLE_PERMISSIONS } from '../../../constants';
import {
  Notification, Loader, TitlePage,
  // GoogleMaps
} from '../../../components';
import { StatusCode } from '../../../components/Status';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { checkSpecifiedRadius, validateMessages, getFullTime } from '../../../utils/helpers';
import { LayoutWrapper, TitleBox, BoxWrapper } from '../../../assets/styles';

import { handleGetDetail, handleUpdate } from '../actions';
import { handleGetList as handleGetPlanList } from "../../plans/actions";
import { handleGetCountries, handleGetProvinces, handleGetDistricts, handleGetWards, handleGetAreas } from '../../public/actions';
import { handleGetList as handleGetRegionList } from '../../regions/actions';
import { handleGetList as handleGetZoneList } from '../../zones/actions';
import { handleGetList as handleGetCityList } from '../../cities/actions';

export default function StoreEdit() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.userInfo);
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState(null);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState();
  const [wards, setWards] = useState([]);
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [dataPlanList, setDataPlanList] = useState(null);


  useEffect(() => {
    dispatch(handleGetDetail(id, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setStore(data);

        const {
          region, name, code, is_active,
          zone_code, city_code,
          lat, lng,
          specified_radius,
          location, country, province, district, ward,
          project_code,
          create_date,
          distributor_code,
          distributor_name,
          client_code,
          shop_owner_name,
          shop_owner_phone,
          dashboard,
          channel,
          subsegment_1,
          subsegment_2,
          sub_area,
          urban_rural,
          png_application,
          bm,
          rsm,
          asm,
          sup_name,
          sale_name,
          sale_phone,
          sale_route,
          sale_email,
          smollan_lead,
          smollan_sup,
          field_marketer,
          field_marketer_phone,
          field_marketer_user,
          remark,
          field_1,
          field_2,
          field_3,
          field_4
        } = data;

        form.setFieldsValue({
          region_id: region?.id,
          name,
          code,
          is_active,
          zone_code,
          city_code,
          lat,
          lng,
          specified_radius,
          location,
          country_code: country?.code,
          province_code: province?.code,
          district_code: district?.code,
          ward_code: ward?.code,
          project_code,
          create_date,
          distributor_code,
          distributor_name,
          client_code,
          shop_owner_name,
          shop_owner_phone,
          dashboard,
          channel,
          subsegment_1,
          subsegment_2,
          sub_area,
          urban_rural,
          png_application,
          bm,
          rsm,
          asm,
          sup_name,
          sale_name,
          sale_phone,
          sale_route,
          sale_email,
          smollan_lead,
          smollan_sup,
          field_marketer,
          field_marketer_phone,
          field_marketer_user,
          remark,
          field_1,
          field_2,
          field_3,
          field_4
        });

        handleGetProvincesFunc(country?.code);
        handleGetDistrictsFunc(country?.code, province?.code);
        handleGetWardsFunc(country?.code, province?.code, district?.code);
      }
    }));

    dispatch(
      handleGetPlanList(
        { page: 1, page_size: 1000, flag_store_details: 1, store_id: id },
        ({ error, data }) => {
          if (error) {
            setDataPlanList([]);
          } else {
            if (ROLE_PERMISSIONS.FILTER_PLAN_DONE_IN_STORE_ROLES.includes(role)) {
              const convertData = data.filter((item) => item.status === "DONE");
              setDataPlanList(convertData);
            } else {
              setDataPlanList(data);
            }
          }
        }
      )
    );

    dispatch(handleGetRegionList({}, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setRegions(data);
      }
    }));

    dispatch(handleGetCountries(({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setCountries(data);
      }
    }));

    dispatch(handleGetZoneList({}, ({ data }) => {
      setZones(data);
    }));

    dispatch(handleGetCityList({}, ({ data }) => {
      setCities(data);
    }));

    dispatch(
      handleGetAreas(({ error, message, data }) => {
        if (error) {
          Notification("error", message);
        } else {
          setAreas(data);
        }
      })
    );
  }, []);

  const handleGetProvincesFunc = (countryCodeValue) => {
    dispatch(handleGetProvinces(countryCodeValue, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setCountryCode(countryCodeValue);
        setProvinces(data);
      }
    }));
  };

  const handleGetDistrictsFunc = (countryCodeValue, provinceCodeValue) => {
    dispatch(handleGetDistricts(countryCodeValue, provinceCodeValue, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinceCode(provinceCodeValue);
        setDistricts(data);
      }
    }));
  };

  const handleGetWardsFunc = (countryCodeValue, provinceCodeValue, districtCodeValue) => {
    dispatch(handleGetWards(countryCodeValue, provinceCodeValue, districtCodeValue, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setDistrictCode(districtCodeValue);
        setWards(data);
      }
    }));
  };

  // ******************************************************************************
  const onChangeCountry = (value) => {
    form.setFieldsValue({
      province_code: undefined,
      district_code: undefined,
      ward_code: undefined
    });

    setProvinceCode(undefined);
    setDistrictCode(undefined);

    handleGetProvincesFunc(value);
  }

  const onChangeProvince = (value) => {
    form.setFieldsValue({
      district_code: undefined,
      ward_code: undefined
    });

    setDistrictCode(undefined);

    handleGetDistrictsFunc(countryCode, value);
  }

  const onChangeDistrict = (value) => {
    form.setFieldsValue({
      ward_code: undefined
    });

    handleGetWardsFunc(countryCode, provinceCode, value);
  }

  // const onChangeLocation = (lat, lng) => {
  //   form.setFieldsValue({
  //     lat,
  //     lng
  //   });
  // };
  // ******************************************************************************

  const onFinish = (values) => {
    const convertValues = {
      ...values,
      id
    };

    setIsLoading(true);
    dispatch(handleUpdate(convertValues, ({ error, message }) => {
      setIsLoading(false);
      if (error) {
        Notification('error', message);
      } else {
        Notification('success', message);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }));
  };

  if (!store || !dataPlanList) {
    return <Loader />;
  }

  return (
    <LayoutWrapper>
      <TitlePage name="Store" type="edit" />

      <BoxWrapper>
        <Spin spinning={isLoading}>
          <Form
            form={form}
            size="small"
            layout="horizontal"
            labelAlign="left"
            initialValues={{}}
            onFinish={onFinish}
            validateMessages={validateMessages}
            labelCol={{ span: 8 }}
          >
            <Row gutter={[24, 24]}>
              <Col span={24} lg={16}>
                <div className="formBox">
                  <TitleBox>Thông tin cửa hàng</TitleBox>
                  <div className="formBoxContent">
                    <Row gutter={[24, 0]}>
                      <Col span={24}>
                        <Divider orientation="left" plain>
                          Thông tin cơ bản
                        </Divider>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="region_id"
                          label="Region"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                          >
                            {regions.map((item) => (
                              <Select.Option key={item.id} value={item.id}>
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="code"
                          label="Smollan code"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="area_code"
                          label="Area code"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                          >
                            {areas.map((item) => (
                              <Select.Option key={item.code} value={item.code}>
                                {item.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      {/* <Col span={24} lg={12}>
                        <Form.Item
                          name="city_code"
                          label="City"
                          rules={[
                            { required: true }
                          ]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                            }
                          >
                            {
                              cities.map((item) => (
                                <Select.Option key={item.code} value={item.code}>{item.label}</Select.Option>
                              ))
                            }
                          </Select>
                        </Form.Item>
                      </Col> */}
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="is_active"
                          label="Active"
                          rules={[{ required: false }]}
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Divider orientation="left" plain>
                          Địa chỉ
                        </Divider>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="location"
                          label="Location"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="country_code"
                          label="Country"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                            onChange={onChangeCountry}
                            disabled
                          >
                            {countries.map((item) => (
                              <Select.Option key={item.code} value={item.code}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="province_code"
                          label="Province"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                            disabled={!countryCode}
                            onChange={onChangeProvince}
                          >
                            {provinces.map((item) => (
                              <Select.Option key={item.code} value={item.code}>
                                {item.display_name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="district_code"
                          label="District"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                            disabled={!provinceCode}
                            onChange={onChangeDistrict}
                          >
                            {districts.map((item) => (
                              <Select.Option key={item.code} value={item.code}>
                                {item.display_name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="ward_code"
                          label="Ward"
                          rules={[{ required: true }]}
                        >
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                                .indexOf(
                                  input
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                ) >= 0
                            }
                            disabled={!districtCode}
                          >
                            {wards.map((item) => (
                              <Select.Option key={item.code} value={item.code}>
                                {item.display_name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="specified_radius"
                          label="Specified radius"
                          rules={[
                            { required: true },
                            { validator: checkSpecifiedRadius },
                          ]}
                        >
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Divider orientation="left" plain>
                          System Info
                        </Divider>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="lat"
                          label="Latitude"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="lng"
                          label="Longitude"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="project_code"
                          label="Project Code"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="create_date"
                          label="Create Date"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Divider orientation="left" plain>
                          Store Info
                        </Divider>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="distributor_code"
                          label="Distributor Code"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="distributor_name"
                          label="Distributor Name"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="client_code"
                          label="Client Code"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="zone_code"
                          label="Zone Code"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="city_code"
                          label="City Code"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="shop_owner_name"
                          label="Shop Owner Name"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} lg={12}>
                        <Form.Item
                          name="shop_owner_phone"
                          label="Shop Owner Phone"
                          rules={[{ required: false }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col span={24} lg={8}>
                <div className="formBox">
                  <TitleBox>Hình cửa hàng</TitleBox>
                </div>

                <div className="formBox">
                  <TitleBox>Danh sách plan</TitleBox>
                  <div className="formBoxContent">
                    <Row gutter={[24, 0]}>
                      <Col span={24} lg={24}>
                        <List
                          bordered
                          dataSource={dataPlanList}
                          renderItem={(item) => {
                            return (
                              <List.Item>
                                <Link target="_blank" to={`/plans/${item.sid}`}>
                                  {item.code}
                                </Link>
                                <span>{`${
                                  getFullTime(item.start_date).date
                                  }`}</span>
                                <StatusCode status={item.status} />
                              </List.Item>
                            );
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>

            {/* <Row gutter={[24, 24]}>
              <Col span={24} lg={12}>
                <div className="formBox">
                  <TitleBox>Store Type</TitleBox>
                  <div className="formBoxContent">
                    <Form.Item
                      name="dashboard"
                      label="Dashboard"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="channel"
                      label="Channel"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="subsegment_1"
                      label="SubSegment 1"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="subsegment_2"
                      label="SubSegment 2"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sub_area"
                      label="Sub Area"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="urban_rural"
                      label="SuUrban Rural"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="png_application"
                      label="PNG Application"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </Col> */}

            {/* <Col span={24} lg={12}>
                <div className="formBox">
                  <TitleBox>Field Staff</TitleBox>
                  <div className="formBoxContent">
                    <Form.Item
                      name="bm"
                      label="BM"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="rsm"
                      label="RSM"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="asm"
                      label="ASM"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sup_name"
                      label="SupName"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sale_name"
                      label="Sale Name"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sale_phone"
                      label="Sale Phone"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sale_route"
                      label="Sale Route"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="sale_email"
                      label="Sale Email"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="smollan_lead"
                      label="Smollan Lead"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="smollan_sup"
                      label="Smollan Sup"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_marketer"
                      label="Field Marketer"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_marketer_phone"
                      label="Field Marketer Phone"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_marketer_user"
                      label="Field Marketer User"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="remark"
                      label="Remark"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col span={24} lg={12}>
                <div className="formBox">
                  <TitleBox>Other Info</TitleBox>
                  <div className="formBoxContent">
                    <Form.Item
                      name="field_1"
                      label="Field 1"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_2"
                      label="Field 2"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_3"
                      label="Field 3"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="field_4"
                      label="Field 4"
                      rules={[
                        { required: false }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row> */}

            <div style={{ textAlign: "center" }}>
              <Space size={10}>
                {ROLE_PERMISSIONS.EDIT_STORE_ROLES.includes(role) && <ButtonSave size="medium" />}
                <ButtonCancel size="medium" />
              </Space>
            </div>
          </Form>
        </Spin>
      </BoxWrapper>
    </LayoutWrapper>
  );
}

/*
<div className="formBox">
              <TitleBox>Google Map</TitleBox>
  <div className="formBoxContent">
    <Form.Item
      label="Map"
      rules={[
        { required: false }
      ]}
    >
      <GoogleMaps location={{ lat: store?.lat, lng: store?.lng }} isShowSearch={true} onChangeLocation={onChangeLocation} />
    </Form.Item>

    <Form.Item
      name="lat"
      label="Latitude"
      rules={[
        { required: true }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="lng"
      label="Longitude"
      rules={[
        { required: true }
      ]}
    >
      <Input />
    </Form.Item>
  </div>
</div>
*/