import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyles = createGlobalStyle`
  html h1,
  html h2,
  html h3,
  html h4,
  html h5,
  html h6,
  html a,
  html p,
  html li,
  input,
  textarea,
  span,
  div,
  html,
  body,
  html a {
    margin-bottom: 0;
  }

  html ul, ol, dl {
    -webkit-padding-start: 0px;
    list-style: none;
    margin-bottom: 0;
  }

  body {
    margin: 0;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.palette.text[0]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /*==========================
    NOTIFICATION
  ===========================*/
  .ant-notification-notice-with-icon {
    position: relative;
    color: #FFF;

    .ant-notification-notice-icon {
      left: 0;
      margin-left: 0;
      font-size: 30px;
      line-height: 30px;
      height: 30px;
      top: 50%;
      transform: translateY(-50%);
      color: inherit;
    }

    .ant-notification-notice-message {
      margin-bottom: 0;
      color: inherit;
    }
  }
  .ant-notification-notice-close {
    color: #FFF;
    &:hover {
      color: #FFF;
    }
  }


  /*==========================
    BUTTON
  ===========================*/
  .ant-btn {
    text-transform: uppercase;
  }
  .ant-popover-buttons button {
    text-transform: initial;
  }


  /*==========================
    TABLE
  ===========================*/
  .ant-table-container {
    overflow-x: auto;
  }
  .ant-table-tbody {
    white-space: nowrap;
  }
  .ant-table table, .ant-table-thead > tr > th {
    text-align: center;
  }


  .ant-spin-nested-loading > div > .ant-spin {
    max-height: 100%;
  }



  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
    width: 100% !important;
  }

  /*==========================
    TAG
  ===========================*/
  .ant-tag {
    font-size: 14px;
    margin-right: 0;
  }

  .ant-space {
    flex-wrap: wrap;
  }

  .ant-form-vertical .ant-form-item-label {
    padding: 0;
  }

  .ant-checkbox-group-item {
    display: block;
  }
`;

export default GlobalStyles;