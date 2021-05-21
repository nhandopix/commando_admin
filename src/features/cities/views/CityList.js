import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

import { StatusActive } from '../../../components/Status';
import { TitlePage } from '../../../components/';
import { LayoutWrapper, BoxWrapper } from '../../../assets/styles';

import { handleGetList } from '../actions';

export default function ZoneList() {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(handleGetList({}, ({ data }) => {
      setIsLoading(false);
      const convertData = data.map((item, index) => {
        return {
          ...item,
          index
        }
      });
      setDataSource(convertData);
    }));
  }, []);

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      width: 60,
      render: (index) => index + 1
    },
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: 'Name',
      dataIndex: 'label'
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      render: (is_active) => <StatusActive isActive={is_active} />
    }
  ];

  return (
    <LayoutWrapper>
      <TitlePage name="City" type="list" />

      <BoxWrapper>
        <Table
          rowKey="id"
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
        />
      </BoxWrapper>
    </LayoutWrapper>
  );
}
