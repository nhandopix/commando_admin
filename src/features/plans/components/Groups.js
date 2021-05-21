import React, { useState } from 'react';
import { Table, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../constants';
import { handleChangeValue } from '../actions';

const Groups = ({ path, dataSource }) => {
  const dispatch = useDispatch();
  const [newDataSource] = useState(() => {
    return dataSource.filter((item) => item && item?.sku_code);
  });
  const { role } = useSelector((state) => state.auth.userInfo);

  const onChangeValue = (value, index) => {
    // console.log('onChangeValue: ', value, index, `${path}.skus.${index}.value`);
    dispatch(handleChangeValue(`${path}.skus.${index}.value`, value));
  }

  const columns = [
    {
      title: 'Code sản phẩm',
      dataIndex: 'sku_code'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'sku_name'
    },
    {
      title: 'Số mặt',
      dataIndex: 'facing'
    },
    {
      title: 'Số lượng',
      dataIndex: 'value',
      render: (value, row, index) => {
        // console.log('Value - row - index: ', value, row, index)

        return <InputNumber onChange={(value) => onChangeValue(value, index)} min={0} defaultValue={value} disabled={(role === ROLE.GUEST)} />
      }
    }
  ];

  return (
    <Table
      rowKey="sku_code"
      // title={() => group.group_name}
      bordered={true}
      columns={columns}
      dataSource={newDataSource}
      pagination={false}
    />
  );
}

export default Groups;
