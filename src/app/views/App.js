import React, { Fragment, useState } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import AppLocale from '../../assets/translations';
import themes from '../../assets/themes';

import GlobalStyles from '../../assets/styles/globalStyle';
import Routes from '../../router';


function App() {
  const [currentLocale, setCurrentLocale] = useState('vi');
  // console.log('AppLocale: ', AppLocale, themes);

  return (
    <ConfigProvider locale={AppLocale[currentLocale].antd}>
      <IntlProvider
        locale={AppLocale[currentLocale].locale}
        messages={AppLocale[currentLocale].message}
      >
        <ThemeProvider theme={themes}>
          <Fragment>
            <GlobalStyles />
            <Routes />
          </Fragment>
        </ThemeProvider>
      </IntlProvider>
    </ConfigProvider >
  );
}

export default App;