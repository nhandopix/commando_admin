import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Input, Button, Spin } from 'antd';
import { Notification } from '../../../components';
import { logo } from '../../../assets/images';
import { LoginWrapper } from './styles';
import { handleLogin } from '../actions';

function LoginPage({ intl }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { isOAuth } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    setIsLoading(true);

    dispatch(handleLogin(values, ({ error, message }) => {
      setIsLoading(false);

      if (error) {
        Notification('error', message);
      }
    }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { from } = location.state || { from: { pathname: '/' } };

  if (isOAuth) {
    return <Redirect to={from} />;
  }

  return (
    <LoginWrapper>
      <div className="loginContentWrapper">
        <div className="loginContent">
          <div className="logoWrapper">
            <img src={logo} style={{ maxWidth: 300, height: 'auto' }} alt="logo" />
          </div>
          <div className="loginForm">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="validate.required" />,
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  autoFocus
                  size="large"
                  placeholder={intl.formatMessage({ id: 'features.login.username' })}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="validate.required" />,
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  size="large"
                  placeholder={intl.formatMessage({ id: 'features.login.password' })}
                  type="password"
                />
              </Form.Item>

              <Spin spinning={isLoading}>
                <Button type="primary" size="large" block htmlType="submit">
                  <FormattedMessage id="features.login.button" />
                </Button>
              </Spin>
              {/* <div className="loginHelperWrapper">
                <p className="loginHelperText">
                  Hint: admin / 123123
                </p>
              </div> */}
            </Form>
          </div>
        </div>
      </div>
    </LoginWrapper>
  )
}

export default injectIntl(LoginPage);