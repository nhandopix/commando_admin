import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tooltip, Modal, Table } from 'antd';
import { HistoryOutlined, DownloadOutlined } from '@ant-design/icons';

import { Notification } from '../../../components';
import { StatusCode } from '../../../components/Status';

import { handleGetList } from '../actions';

function ButtonImportHistory({ importType, titleModal }) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    page_size: 10,
    import_type: importType
  });

  useEffect(() => {
    if (visible) {
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
    }

  }, [visible, query]);

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      render: (index) => index + 1
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <StatusCode status={status} />
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      render: (created_at) => new Date(created_at).toLocaleDateString('vi-VN')
    },
    {
      title: 'File size',
      dataIndex: 'file_size'
    },
    {
      title: 'Rows success',
      dataIndex: 'rows_success'
    },
    {
      title: 'Rows errors',
      dataIndex: 'rows_errors'
    },
    {
      title: 'Imported records',
      dataIndex: 'imported_records'
    },
    {
      title: 'Action',
      dataIndex: 'error_file',
      render: (error_file) => {
        return error_file ? (
          <Button
            type="link"
            icon={<DownloadOutlined style={{ fontSize: 20 }} />}
            style={{ color: '#ff4d4f' }}
            onClick={() => onPressDownloadFileError(error_file)}
          />
        ) : error_file
      }
    },
  ];

  const onPressDownloadFileError = (url) => {
    window.open(url, '_blank');
  };

  const onClickVisible = () => {
    setVisible(true);
  };

  const onClickCancel = () => {
    setVisible(false);
    setQuery({ ...query, page: 1 });
  };

  return (
    <Fragment>
      <Modal
        title={titleModal}
        visible={visible}
        width={800}
        onCancel={onClickCancel}
        footer={[
          <Button key="back" onClick={onClickCancel}>Đóng</Button>
        ]}
      >
        <Table
          rowKey="id"
          bordered={true}
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{
            current: query.page,
            pageSize: query.page_size,
            total: total,
            onChange: (page) => {
              setQuery({ ...query, page });
            }
          }}
        />
      </Modal>

      <Tooltip placement="bottom" title="Lịch sử import">
        <Button
          size="large"
          icon={<HistoryOutlined />}
          onClick={onClickVisible}
        />
      </Tooltip>
    </Fragment>
  );
}

ButtonImportHistory.propTypes = {
  importType: PropTypes.string.isRequired,
  titleModal: PropTypes.string
};

ButtonImportHistory.defaultProps = {
  titleModal: 'Import history'
};

export default React.memo(ButtonImportHistory);