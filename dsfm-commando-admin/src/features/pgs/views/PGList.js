import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Input, Form, Row, Col, Button, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { LayoutWrapper, BoxWrapper } from '../../../assets/styles';
import { Notification, TitlePage } from '../../../components';
import { ButtonImport, ButtonImportHistory } from '../../import/components';
import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonDownloadTemplate } from '../../../components/Button';
import { StatusActive } from '../../../components/Status';

import { handleGetList, handleSetQuery, handleDelete } from '../actions';

export default function PGList() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useSelector((state) => state.mer);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      width: 60,
      render: (index) => index + 1
    },
    {
      title: 'Username',
      render: (row) => <ButtonEdit id={row.public_id}>{row.username}</ButtonEdit>
    },
    {
      title: 'Full name',
      dataIndex: 'full_name'
    },
    // {
    //   title: 'Email',
    //   dataIndex: 'email'
    // },
    // {
    //   title: 'Phone number',
    //   dataIndex: 'phone_number'
    // },
    {
      title: 'Active',
      dataIndex: 'is_active',
      render: (is_active) => <StatusActive isActive={is_active} />
    },
    {
      title: 'Date joined',
      dataIndex: 'date_joined',
      render: (date_joined) => date_joined ? new Date(date_joined).toLocaleDateString('vi-VN') : ''
    },
  ];

  const onFinish = ({ search }) => {
    if (query.search !== search) {
      dispatch(handleSetQuery({ ...query, page: 1, search }));
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

  return (
    <LayoutWrapper>
      <TitlePage name="MER" type="list" />

      <BoxWrapper>
        <Form
          size="large"
          form={form}
          onFinish={onFinish}
          initialValues={{
            search: query.search
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
              <Button type="primary" htmlType="submit">Tìm kiếm</Button>
            </Col>
          </Row>
        </Form>

        <Space style={{ marginBottom: 15 }}>
          <ButtonCreate />

          <ButtonDelete
            onConfirmDelete={onConfirmDelete}
            disabled={!selectedRowKeys.length}
          />

          <ButtonImport
            importType="IMPORT_USER"
            titleModal="Import MER"
          />

          <ButtonDownloadTemplate url="IMPORT_USER" />

          <ButtonImportHistory
            importType="IMPORT_USER"
            titleModal="Import history MER"
          />
        </Space>

        <Table
          rowKey="public_id"
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
  );
}