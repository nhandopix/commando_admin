import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

import { Notification } from '../../../components';
import { TitleBox } from '../../../assets/styles';

import { handleGetForms } from '../actions';

export default function PlanForms({ planSid }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [query, setQuery] = useState({ page: 1, page_size: 10 });

  useEffect(() => {
    dispatch(handleGetForms(planSid, query, ({ error, message, data, total }) => {
      setIsLoading(false);
      if (error) {
        Notification('error', message);
      } else {
        setTotal(total);
        setDataSource(convertDataSource(data));
        setColumns(convertColumns(data));
      }
    }));
  }, [query.page]);


  const convertDataSource = (data) => {
    const editData = [];

    data.forEach((item, index) => {
      const rowData = {};
      const { inputs, form_sampling } = item;

      inputs.forEach((input) => {
        if (input.input_type.code === 'SAMPLING') {
          rowData['SAMPLING_ID'] = input?.value;
        } else {
          rowData[input.input_type.code] = input?.value;
        }
      });

      rowData['SAMPLING'] = form_sampling.sampling.label;

      editData.push({ ...rowData, ...item, index })
    });

    return editData;
  };

  const convertColumns = (data) => {
    const columns = [];
    data.forEach((item) => {
      if (item.inputs.length > 0 && columns.length === 0) {
        columns.push({
          title: 'Index',
          dataIndex: 'index',
          render: (index) => index + 1
        });
        item.inputs.forEach((col) => {
          if (col.input_type.code === 'SAMPLING') {
            columns.push({
              title: 'Sampling ID',
              dataIndex: 'SAMPLING_ID'
            });
          } else {
            columns.push({
              title: col.input_type.label,
              dataIndex: col.input_type.code
            });
          }

        });

        columns.push({
          title: 'Sampling',
          dataIndex: 'SAMPLING'
        });
      }
    });

    return columns;
  };

  return (
    <div className="formBox">
      <TitleBox>Thông tin phát mẫu</TitleBox>
      <div className="formBoxContent">
        {
          dataSource.length > 0 ? (
            <Table
              rowKey="sid"
              bordered={true}
              columns={columns}
              dataSource={dataSource}
              loading={isLoading}
              pagination={{
                current: query.page, // set current ở đây để search
                pageSize: query.page_size,
                total: total,
                onChange: (page) => {
                  setQuery({ ...query, page });
                }
              }}
            />
          ) : (
              <h3 style={{ padding: '0 30px 30px 30px' }}>Không có thông tin phát mẫu.</h3>
            )
        }
      </div>
    </div>
  )
}

PlanForms.propTypes = {
  planSid: PropTypes.string
};