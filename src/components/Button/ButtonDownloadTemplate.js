import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const urlTemplate = {
  IMPORT_USER: 'https://docs.google.com/spreadsheets/d/1FDrVGyWzclEQVTtLVs19dm-Dm7lnXhdSvdUbnMxuwtM/export?format=xlsx',
  IMPORT_STORE: 'https://docs.google.com/spreadsheets/d/1C4eZzOi4DwrRaLPgDihwsr4qrpR67k9r6S5dX59QsAE/export?format=xlsx',
  IMPORT_PLAN: 'https://docs.google.com/spreadsheets/d/1G01iDU-DTLLsng-fBP5Hr-6Glpn0X-FuOLzMeblGP4o/export?format=xlsx',
};


function ButtonDownloadTemplate({ url }) {
  const onPressDownloadTemplate = () => {
    window.open(urlTemplate[url], '_blank');
  }

  return (
    <Tooltip placement="bottom" title="Tải file mẫu">
      <Button
        ghost
        type="primary"
        size="large"
        icon={<DownloadOutlined />}
        onClick={onPressDownloadTemplate}
      >
        Download template
      </Button>
    </Tooltip>
  );
}

ButtonDownloadTemplate.propTypes = {
  url: PropTypes.string.isRequired
};

export default React.memo(ButtonDownloadTemplate);