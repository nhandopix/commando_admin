import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import {
  Space, Table, Input, Button, Select, Form, Row, Col, Pagination
  // , Modal
} from 'antd';
import { ROLE_PERMISSIONS } from "../../../constants";

import {
  Notification,
  // GoogleMaps,
  TitlePage
} from '../../../components';
import { StatusActive } from '../../../components/Status';
import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonDownloadTemplate } from '../../../components/Button';
import { ButtonImport, ButtonImportHistory } from '../../import/components';
import { LayoutWrapper, BoxWrapper } from '../../../assets/styles';

import { handleGetList, handleSetQuery, handleDelete } from '../actions';
import { handleGetProvinces, handleGetAreas } from '../../public/actions';

export default function StoreList() {
  const { role } = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useSelector((state) => state.store);
  const [provinces, setProvinces] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [isVisible, setIsVisible] = useState(false);
  // const [location, setLocation] = useState({
  //   lat: 0,
  //   lng: 0
  // });

  useEffect(() => {
    setIsLoading(true);
    dispatch(handleGetList(query, ({ error, total, data, message }) => {
      setIsLoading(false);
      if (error) {
        Notification('error', message);
      } else {
        const convertData = data.map((item, index) => {
          return {
            ...item,
            index
          }
        });
        setTotal(total);
        setDataSource(convertData);
      }
    }));
  }, [query]);

  useEffect(() => {
    dispatch(handleGetProvinces('VNM', ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        setProvinces(data)
      }
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

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      width: 60,
      render: (index) => (query.page - 1) * query.page_size + index + 1,
    },
    {
      title: "Code",
      render: (row) => <ButtonEdit id={row.sid}>{row.code}</ButtonEdit>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'location',
    //   render: (location, row) => {
    //     return `${location || ''}${row.ward?.display_name ? ', ' + row.ward?.display_name : ''}${row.district?.display_name ? ', ' + row.district?.display_name : ''}${row.province?.display_name ? ', ' + row.province?.display_name : ''}`;
    //   }
    // },
    // {
    //   title: "Province",
    //   dataIndex: "province",
    //   render: (province) => province?.display_name,
    // },
    {
      title: "Region",
      dataIndex: "region",
      render: (region) => region.label,
    },
    {
      title: "Area",
      dataIndex: "area_code",
      render: (area_code) => {
        return areas.map((area) => {
          if (area.code == area_code) return area.label;
        });
      },
    },
    // {
    //   title: 'Coordinates',
    //   render: (row) => {
    //     if (row.lat && row.lng) {
    //       return <Button type="link" onClick={() => onClickVisibleMap(row.lat, row.lng)}>{`${row.lat}, ${row.lng}`}</Button>
    //     }
    //   }
    // },
    {
      title: "Active",
      dataIndex: "is_active",
      render: (is_active) => <StatusActive isActive={is_active} />,
    },
  ];

  const onFinish = ({ search, province_code }) => {
    if (query.search !== search || query.province_code !== province_code) {
      dispatch(handleSetQuery({ ...query, page: 1, search, province_code }))
    }
  };

  const onConfirmDelete = () => {
    dispatch(handleDelete(selectedRowKeys, ({ error, message, data }) => {
      if (error) {
        Notification('error', message);
      } else {
        const currentPage = query.page;
        const tempPage = Math.ceil((total - data) / query.page_size) || 1; // Trường hợp xóa hết ==> 1
        const page = tempPage >= currentPage ? currentPage : tempPage;
        // console.log('currentPage = tempPage ===> page', currentPage, tempPage, page);
        dispatch(handleSetQuery({ ...query, page }));
        setSelectedRowKeys([]);
        Notification('success', message);
      }
    }));
  };

  // const onClickVisibleMap = (lat, lng) => {
  //   setIsVisible(true);
  //   setLocation({ lat, lng });
  // };

  // const onClickCloseMap = () => {
  //   setIsVisible(false);
  // };

  return (
    <LayoutWrapper>
      {/* MAP */}
      {/* <Modal
        centered
        title="MAPS"
        width={960}
        visible={isVisible}
        onCancel={onClickCloseMap}
        footer={[
          <Button key="back" onClick={onClickCloseMap}>Close</Button>
        ]}
      >
        <GoogleMaps location={location} />
      </Modal> */}

      <TitlePage name="Store" type="list" />

      <BoxWrapper>
        <Form
          size="large"
          form={form}
          onFinish={onFinish}
          initialValues={{
            search: query.search,
            province_code: query.province_code
          }}
          style={{ marginBottom: 40 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item name="search" noStyle>
                <Input
                  allowClear
                  placeholder='Nhập từ khóa'
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item name="province_code" noStyle>
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn tỉnh thành"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                  }
                >
                  {
                    provinces.map((item) => (
                      <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Button type="primary" htmlType="submit">Tìm kiếm</Button>
            </Col>
          </Row>
        </Form>

        {ROLE_PERMISSIONS.ACTION_STORE_ROLES.includes(role) && (<Space style={{ marginBottom: 15 }}>
          <ButtonCreate />

          <ButtonDelete
            onConfirmDelete={onConfirmDelete}
            disabled={!selectedRowKeys.length}
          />

          <ButtonImport
            importType="IMPORT_STORE"
            titleModal="Import Store"
          />

          <ButtonDownloadTemplate url="IMPORT_STORE" />

          <ButtonImportHistory
            importType="IMPORT_STORE"
            titleModal="Import history Store"
          />
        </Space>)
        }

        <Table
          rowKey="sid"
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            }
          }}
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={false}
          footer={() => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
              <p>{selectedRowKeys.length ? selectedRowKeys.length + ' item(s) selected' : ''}</p>
              <Pagination
                current={query.page}
                pageSize={query.page_size}
                total={total}
                onChange={(page) => dispatch(handleSetQuery({ ...query, page }))}
              />
            </div>
          )}
        />
      </BoxWrapper>
    </LayoutWrapper>
  )
}