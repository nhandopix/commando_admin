import React, { useState, useEffect, Fragment } from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SearchOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { Space, Table, Input, Select, DatePicker, Form, Row, Col, Button, Pagination } from 'antd';

import { Notification, TitlePage } from '../../../components';
import { StatusCode } from '../../../components/Status';
import { ButtonCreate, ButtonDelete, ButtonEdit, ButtonDownloadTemplate, ButtonCheckQC } from '../../../components/Button';
import { ButtonImport, ButtonImportHistory } from '../../import/components';
import { LayoutWrapper, BoxWrapper } from '../../../assets/styles';
import { STATUS_CODE, ROLE_PERMISSIONS } from "../../../constants";

import { handleGetList, handleSetQuery, handleDelete, handleExportList, handleUpdate } from '../actions';
import { handleGetList as handleGetPgList } from '../../pgs/actions';
import { handleGetList as handleGetStoreList } from '../../stores/actions';

// 3 trang thai null,asc,dsc
const ORDER_MAPPING = {
  code: '',
  startDate: '',
  endDate: '',
  merName: '',
  storeName: '',
  storeCode: '',
  region: '',
  status: '',
  qcStatus: ''
};

export default function PlanList() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.userInfo);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useSelector((state) => state.plan);
  const [PGs, setPGs] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dates, setDates] = useState([]);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [isShowExport, setIsShowExport] = useState(false);
  const [tableOrder, setTableOrder] = useState(() => {
    return ORDER_MAPPING;
  });

  useEffect(() => {
    setIsLoading(true);
    dispatch(handleGetList(ROLE_PERMISSIONS.QUERY_ALL_PLAN.includes(role) ? query : { ...query, status: 'DONE' }, ({ error, total, data, message }) => {
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
        if (query.isExport !== isShowExport) {
          setIsShowExport(query.isExport);
        }
      }
    }));
  }, [query]);

  useEffect(() => {
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
  }, []);

  const sort_click = (orderKey) => {
    let order_update = { ...tableOrder };
    if (order_update.hasOwnProperty(orderKey)) {
      switch (order_update[orderKey]) {
        case '':
          order_update[orderKey] = 'asc';
          break;
        case 'asc':
          order_update[orderKey] = 'desc';
          break;
        case 'desc':
          order_update[orderKey] = '';
          break;
      }
    }
    setTableOrder(order_update);

    console.log(tableOrder);

    document.getElementById('btn_query').click();

    // onFinish(query.search, query.pg_sid, query.store_sid, query.status, query.qc_status, query.start_end);

  };

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      width: 60,
      render: (index) => ((query.page - 1) * query.page_size) + index + 1
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('code')}>
            Code
            <CaretUpOutlined
              style={{ color: tableOrder.code === 'asc' ? 'blue' : 'grey' }}
            />
            <CaretDownOutlined
              style={{ color: tableOrder.code === 'desc' ? 'blue' : 'grey' }}
            />
          </div>
        </React.Fragment>
      ),

      render: (row) => <ButtonEdit id={row.sid}>{row.code}</ButtonEdit>,
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('startDate')}>
            Start date
            <CaretUpOutlined
              style={{
                color: tableOrder.startDate === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.startDate === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'start_date',
      render: (start_date) => start_date.split('-').reverse().join('-')
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('endtDate')}>
            End date
            <CaretUpOutlined
              style={{
                color: tableOrder.endDate === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.endDate === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),

      dataIndex: 'end_date',
      render: (end_date) => end_date.split('-').reverse().join('-')
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('merName')}>
            MER working
            <CaretUpOutlined
              style={{
                color: tableOrder.merName === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.merName === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'pgs',
      render: (pgs) => (
        <Link to={`mers/${pgs[0].public_id}`}>{`${pgs[0].username} - ${pgs[0].full_name}`}</Link>
      )
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('storeName')}>
            Location name
            <CaretUpOutlined
              style={{
                color: tableOrder.storeName === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.storeName === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'store',
      render: (store) => (
        <Link to={`/stores/${store.sid}`}>{`${store.name}`}</Link>
      )
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('storeCode')}>
            Location Code
            <CaretUpOutlined
              style={{
                color: tableOrder.storeCode === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.storeCode === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'store',
      render: (store) => (
        <Link to={`/stores/${store.sid}`}>{`${store.code}`}</Link>
      )
    },
    {
      title: (
        <React.Fragment>
          <div onClick={() => sort_click('region')}>
            Region
            <CaretUpOutlined
              style={{
                color: tableOrder.region === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.region === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'store',
      render: (store) => store.region.label
    },
    {
      title: (
        <React.Fragment>
          <div
            onClick={() => sort_click('status')}
          >
            Status
            <CaretUpOutlined
              style={{
                color: tableOrder.status === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.status === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'status',
      render: (status) => <StatusCode status={status} />
    },
    {
      title: (
        <React.Fragment>
          <div
            onClick={() => sort_click('qcStatus')}
          >
            QC Status
            <CaretUpOutlined
              style={{
                color: tableOrder.qcStatus === 'asc' ? 'blue' : 'grey',
              }}
            />
            <CaretDownOutlined
              style={{
                color: tableOrder.qcStatus === 'desc' ? 'blue' : 'grey',
              }}
            />
          </div>
        </React.Fragment>
      ),
      dataIndex: 'qc_status',
      render: (qc_status) => <StatusCode status={qc_status} />
    }
  ];

  const onFinish = ({ search, pg_sid, store_sid, status, qc_status, start_end }) => {
    if (!start_end) {
      start_end = [];
    }

    const start_date = start_end[0]?.format('DD-MM-YYYY');
    const end_date = start_end[1]?.format('DD-MM-YYYY');

    if (
      true
      /*
          query.search !== search ||
          query.pg_sid !== pg_sid ||
          query.store_sid !== store_sid ||
          query.start_date !== start_date ||
          query.end_date !== end_date ||
          query.status !== status ||
          query.qc_status !== qc_status
      */
    ) {
      const isExport = (status === 'DONE' && start_date && end_date) ? true : false;

      dispatch(handleSetQuery({
        ...query,
        page: 1,
        search,
        pg_sid,
        store_sid,
        start_date,
        end_date,
        status,
        qc_status,
        isExport,
        orders: JSON.stringify(tableOrder)
      }));

      // Clear selectedRowKeys
      setSelectedRowKeys([]);
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

  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
    return tooEarly || tooLate;
  };

  const onClickToExport = () => {
    const convertQuery = {
      ...query, // nếu muốn sử dụng lại các query cũ
      plan_status: 'DONE',
      from_date: query.start_date,
      to_date: query.end_date
    };

    console.log('onClickToExport', query);
    console.log('onClickToExport convertQuery', convertQuery);

    setIsLoadingExport(true);
    dispatch(handleExportList(convertQuery, ({ error, data, message }) => {
      setIsLoadingExport(false);
      if (error) {
        Notification('error', message);
      } else {
        if (data.export_file_url) {
          // window.open(data.export_file_url, , '_blank');

          const link = document.createElement('a');
          link.href = data.export_file_url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          Notification('success', 'Xuất báo cáo thành công', '', 5);
        } else {
          Notification('error', 'Không có dữ liệu để xuất báo cáo');
        }
      }
    }));
  };

  const onClickCheckQC = (values) => {
    const data = {
      ids: selectedRowKeys,
      values
    };

    dispatch(handleUpdate(
      data,
      ({ error, message, data }) => {
        if (error) {
          Notification('error', message);
        } else {
          const currentPage = query.page;
          const tempPage = Math.ceil((total - data) / query.page_size) || 1; // Trường hợp xóa hết ==> 1
          const page = tempPage >= currentPage ? currentPage : tempPage;

          dispatch(handleSetQuery({ ...query, page }));
          setSelectedRowKeys([]);
          Notification('success', message);
        }
      },
      'PATCH'
    ));
  };

  return (
    <LayoutWrapper>
      <TitlePage name="Plan" type="list" />

      <BoxWrapper>
        <Form
          size="large"
          form={form}
          onFinish={onFinish}
          initialValues={{
            search: query.search,
            pg_sid: query.pg_sid,
            store_sid: query.store_sid,
            status: query.status,
            qc_status: query.qc_status,
            start_end: [
              query.start_date ? moment(query.start_date, 'DD/MM/YYYY') : query.start_date,
              query.end_date ? moment(query.end_date, 'DD/MM/YYYY') : query.end_date
            ]
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
              <Form.Item name="pg_sid" noStyle>
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn Mer"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                  }
                  dropdownMatchSelectWidth={false}
                >
                  {
                    PGs.map((item) => (
                      <Select.Option key={item.sid} value={item.sid}>{`${item.username} - ${item.full_name}`}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item name="store_sid" noStyle>
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn Store"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) >= 0
                  }
                  dropdownMatchSelectWidth={false}
                >
                  {
                    stores.map((item) => (
                      <Select.Option key={item.sid} value={item.sid}>{`${item.name || item.sid}`}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            {ROLE_PERMISSIONS.ACTION_PLAN_ROLES.includes(role) && (
              <Fragment>
                <Col xs={24} sm={12} lg={8} xl={6}>
                  <Form.Item name="status" noStyle>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Chọn Status"
                    >
                      {STATUS_CODE.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8} xl={6}>
                  <Form.Item name="qc_status" noStyle>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Chọn QC Status"
                    >
                      <Select.Option value="AWAIT">AWAIT</Select.Option>
                      <Select.Option value="FAILED">FAILED</Select.Option>
                      <Select.Option value="PASSED">PASSED</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Fragment>
            )}

            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item
                name="start_end"
                rules={[
                  { type: 'array', required: false }
                ]}
                noStyle
              >
                <DatePicker.RangePicker
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  onCalendarChange={value => {
                    setDates(value);
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8} xl={6}>
              <Button type="primary" htmlType="submit" id="btn_query">Tìm kiếm</Button>
            </Col>
          </Row>
        </Form>

        {ROLE_PERMISSIONS.ACTION_PLAN_ROLES.includes(role) && (
          <Space style={{ marginBottom: 15 }}>
            <ButtonCreate />

            <ButtonDelete
              onConfirmDelete={onConfirmDelete}
              disabled={!selectedRowKeys.length}
            />

            <ButtonCheckQC
              disabled={!selectedRowKeys.length || query.status !== 'DONE' || query.qc_status !== 'AWAIT'}
              onClickCheckQC={onClickCheckQC}
            />

            <ButtonImport
              importType="IMPORT_PLAN"
              titleModal="Import Plan"
            />

            <ButtonDownloadTemplate url="IMPORT_PLAN" />

            <ButtonImportHistory
              importType="IMPORT_PLAN"
              titleModal="Import history Plan"
            />

            {
              isShowExport && (
                <Button type="danger" size="large" disabled={isLoading} ghost onClick={onClickToExport} loading={isLoadingExport}>Xuất báo cáo</Button>
              )
            }

          </Space>
        )}

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
                showTotal={total => `Total ${total} items`}
              />
            </div>
          )}
        />
      </BoxWrapper>
    </LayoutWrapper>
  );
}
