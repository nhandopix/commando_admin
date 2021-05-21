import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Space, Spin, Select, DatePicker } from 'antd';

import { STATUS_CODE } from '../../../constants';
import { Notification } from '../../../components';
import { ButtonCancel, ButtonSave } from '../../../components/Button';
import { validateMessages } from '../../../utils/helpers';
import { LayoutWrapper, TitleWrapper, TitleHeader, TitleBox, BoxWrapper, formItemLayout, tailFormItemLayout } from '../../../assets/styles';

import { handleCreate } from '../actions';
import { handleGetList as handleGetCampaignList } from '../../campaigns/actions';
import { handleGetList as handleGetPgList } from '../../pgs/actions';
import { handleGetList as handleGetStoreList } from '../../stores/actions';
import { handleGetList as handleGetRegionList } from '../../regions/actions';
import { handleGetProvinces } from '../../public/actions';

export default function PlanCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [PGs, setPGs] = useState([]);
  const [stores, setStores] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    dispatch(handleGetCampaignList({ page: 1, page_size: 1000 }, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setCampaigns(data);
        form.setFieldsValue({
          campaign_code: data[0].code
        })
      }
    }));

    dispatch(handleGetPgList({ page: 1, page_size: 1000 }, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setPGs(data);
      }
    }));

    dispatch(handleGetStoreList({ page: 1, page_size: 1000 }, ({ error, data, message }) => {
      if (error) {
        Notification('error', message);
      } else {
        setStores(data);
      }
    }));

    dispatch(handleGetRegionList({}, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setRegions(data);
      }
    }));

    dispatch(handleGetProvinces('VNM', ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinces(data);
      }
    }));
  }, []);


  const onFinish = (values) => {
    const convertValues = {
      ...values,
      start_date: values['start_date'].format('YYYY-MM-DD'),
      end_date: values['end_date'].format('YYYY-MM-DD'),
      pgs: [
        { pg_public_id: values.pg_public_id }
      ]
    };


    setIsLoading(true)
    dispatch(handleCreate(convertValues, ({ error, message }) => {
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

  const onChangeStore = (value) => {
    const selectedStore = stores.find((item) => item.sid === value);

    form.setFieldsValue({
      region_id: selectedStore?.region?.id,
      province_code: selectedStore?.province?.code
    });
  };

  return (
    <LayoutWrapper>
      <TitleWrapper>
        <TitleHeader>Tạo mới Plan</TitleHeader>
      </TitleWrapper>

      <BoxWrapper>
        <Spin spinning={isLoading}>
          <Form
            {...formItemLayout}
            form={form}
            size="large"
            initialValues={{
              status: 'TODO'
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <div className="formBox">
              <TitleBox>Thông tin cơ bản</TitleBox>
              <div className="formBoxContent">
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
                  >
                    {
                      STATUS_CODE.map((item) => (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
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

                <Form.Item
                  name="campaign_code"
                  label="Campaign"
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
                    disabled
                  >
                    {
                      campaigns.map((item) => (
                        <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  name="start_date"
                  label="Start date"
                  rules={[
                    { required: true }
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item
                  name="end_date"
                  label="End date"
                  rules={[
                    { required: true }
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
              </div>
            </div>

            <div className="formBox">
              <TitleBox>Store</TitleBox>
              <div className="formBoxContent">
                <Form.Item
                  name="store_sid"
                  label="Store"
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
                    onChange={onChangeStore}
                  >
                    {
                      stores.map((item) => (
                        <Select.Option key={item.sid} value={item.sid}>{`${item.name || item.sid}`}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  name="region_id"
                  label="Region"
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
                      regions.map((item) => (
                        <Select.Option key={item.id} value={item.id}>{item.label}</Select.Option>
                      ))
                    }
                  </Select>
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

              </div>
            </div>

            <div className="formBox">
              <TitleBox>MER</TitleBox>
              <div className="formBoxContent">
                <Form.Item
                  name="pg_public_id"
                  label="Username - Full name"
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
                      PGs.map((item) => (
                        <Select.Option key={item.public_id} value={item.public_id}>{`${item.username} - ${item.full_name}`}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </div>
            </div>

            <Form.Item {...tailFormItemLayout}>
              <Space size={10}>
                <ButtonSave />
                <ButtonCancel />
              </Space>
            </Form.Item>
          </Form>
        </Spin>
      </BoxWrapper>
    </LayoutWrapper>
  );
}