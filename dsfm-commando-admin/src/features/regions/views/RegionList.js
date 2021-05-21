import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Space, Table } from 'antd';

import { LayoutWrapper, TitleWrapper, TitleHeader, BoxWrapper } from '../../../assets/styles';
import { Notification } from '../../../components';
import { StatusActive } from '../../../components/Status';
import { ButtonCreate, ButtonDelete, ButtonEdit } from '../../../components/Button';

import { handleGetList } from '../actions';

export default function RegionList() {
  const dispatch = useDispatch();
  // const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({
    ordering: '',
    page: 1,
    page_size: 10
  });

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
        // setTotal(total);
        setDataSource(convertData);
      }
    }));
  }, [query]);

  const onConfirmDelete = (id) => {
    console.log('ID: ', id)
    // dispatch(handleDelete(id, ({ error, message }) => {
    //   if (error) {
    //     Notification('error', message);
    //   } else {
    //     setIsLoading(true);
    //     dispatch(handleGetList(query, ({ error, total, data, message }) => {
    //       setIsLoading(false);
    //       if (error) {
    //         Notification('error', message);
    //       } else {
    //         const convertData = data.map((item, index) => {
    //           return {
    //             ...item,
    //             index
    //           }
    //         });
    //         setTotal(total);
    //         setDataSource(convertData);
    //         Notification('success', 'Xóa thành công');
    //       }
    //     }));
    //   }
    // }));
  };

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
      // dataIndex: 'is_active',
      render: (is_active) => <StatusActive isActive={true} />
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'id',
    //   width: 60,
    //   render: (id) => {
    //     return (
    //       <Space size="middle">
    //         <ButtonEdit id={id} />
    //         <ButtonDelete id={id} onConfirmDelete={onConfirmDelete} />
    //       </Space>
    //     );
    //   },
    // },
  ];

  return (
    <LayoutWrapper>
      <TitleWrapper>
        <TitleHeader>Danh sách Region</TitleHeader>
        {/* <Space>
          <ButtonCreate />
        </Space> */}
      </TitleWrapper>

      <BoxWrapper>
        <Table
          rowKey="id"
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{
            current: query.page, // set current ở đây để search
            pageSize: query.page_size,
            // total: total,
            onChange: (page) => {
              setQuery({ ...query, page });
            }
          }}
        />
      </BoxWrapper>
    </LayoutWrapper>
  )
}
