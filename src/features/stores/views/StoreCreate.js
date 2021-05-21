import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Switch, Space, Spin, Select, Row, Col, Anchor, Affix } from 'antd';

import {
  Notification, TitlePage,
  // GoogleMaps
} from '../../../components';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { checkSpecifiedRadius, validateMessages } from '../../../utils/helpers';
import { LayoutWrapper, TitleBox, BoxWrapper } from '../../../assets/styles';

import { handleCreate } from '../actions';
import {
  handleGetCountries,
  handleGetProvinces,
  handleGetDistricts,
  handleGetWards,
  handleGetAreas,
} from "../../public/actions";
import { handleGetList as handleGetRegionList } from '../../regions/actions';
import { handleGetList as handleGetZoneList } from '../../zones/actions';
import { handleGetList as handleGetCityList } from '../../cities/actions';

export default function StoreCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('VNM');
  const [provinces, setProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState();
  const [wards, setWards] = useState([]);
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);


  useEffect(() => {
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
        form.setFieldsValue({
          country_code: 'VNM'
        });
      }
    }));

    dispatch(handleGetProvinces(countryCode, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinces(data);
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

  // ******************************************************************************
  const onChangeCountry = (value) => {
    form.setFieldsValue({
      province_code: undefined,
      district_code: undefined,
      ward_code: undefined
    });

    setProvinceCode(undefined);
    setDistrictCode(undefined);

    dispatch(handleGetProvinces(value, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setCountryCode(value);
        setProvinces(data);
      }
    }));
  }

  const onChangeProvince = (value) => {
    form.setFieldsValue({
      district_code: undefined,
      ward_code: undefined
    });

    setDistrictCode(undefined);

    dispatch(handleGetDistricts(countryCode, value, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinceCode(value);
        setDistricts(data);
      }
    }));
  }

  const onChangeDistrict = (value) => {
    form.setFieldsValue({
      ward_code: undefined
    });

    dispatch(handleGetWards(countryCode, provinceCode, value, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setDistrictCode(value);
        setWards(data);
      }
    }));
  }

  // const onChangeLocation = (lat, lng) => {
  //   form.setFieldsValue({
  //     lat,
  //     lng
  //   });
  // };
  // ******************************************************************************

  const onFinish = (values) => {
    setIsLoading(true)
    dispatch(handleCreate(values, ({ error, message }) => {
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

  return (
    <LayoutWrapper>
      <TitlePage name="Store" type="create" />
      <BoxWrapper>
        <Spin spinning={isLoading}>
          <Form
            form={form}
            size="large"
            layout="vertical"
            initialValues={{
              is_active: false,
              specified_radius: 10000
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Row gutter={[24, 24]}>
              <Col span={24} lg={12}>
                <div className="formBox">
                  <TitleBox>Thông tin cơ bản</TitleBox>
                  <div className="formBoxContent">
                    <Form.Item
                      name="region_id"
                      label="Region"
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
                          regions.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.label}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="area_code"
                      label="Area code"
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
                          areas.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.label}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="code"
                      label="Code"
                      rules={[
                        { required: true }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    {/* <Form.Item
                      name="zone_code"
                      label="Zone code"
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
                          zones.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.label}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="city_code"
                      label="City code"
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
                    </Form.Item> */}

                    <Form.Item
                      name="is_active"
                      label="Active"
                      rules={[
                        { required: false }
                      ]}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              </Col>

              <Col span={24} lg={12}>
                <div className="formBox">
                  <TitleBox>Địa chỉ</TitleBox>
                  <div className="formBoxContent">
                    <Form.Item
                      name="location"
                      label="Location"
                      rules={[
                        { required: true }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="country_code"
                      label="Country"
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
                        onChange={onChangeCountry}
                        disabled
                      >
                        {
                          countries.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="province_code"
                      label="Province"
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
                        disabled={!countryCode}
                        onChange={onChangeProvince}
                      >
                        {
                          provinces.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.display_name}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="district_code"
                      label="District"
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
                        disabled={!provinceCode}
                        onChange={onChangeDistrict}
                      >
                        {
                          districts.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.display_name}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="ward_code"
                      label="Ward"
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
                        disabled={!districtCode}
                      >
                        {
                          wards.map((item) => (
                            <Select.Option key={item.code} value={item.code}>{item.display_name}</Select.Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="specified_radius"
                      label="Specified radius"
                      rules={[
                        { required: true },
                        { validator: checkSpecifiedRadius }
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>

            <div style={{ textAlign: 'center' }}>
              <Space size={10}>
                <ButtonSave />
                <ButtonCancel />
              </Space>
            </div>
          </Form>
        </Spin>
      </BoxWrapper>
    </LayoutWrapper>
  );
}

/*
<Col span={12}>
  <div className="formBox">
    <TitleBox>Google Map</TitleBox>
    <div className="formBoxContent">
      <Form.Item
        label="Map"
        rules={[
          { required: false }
        ]}
      >
        <GoogleMaps isShowSearch={true} onChangeLocation={onChangeLocation} />
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
</Col>
*/