import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { useWindowSize } from '../../../utils/hooks';
import Sidebar from '../../Sidebar/Sidebar';
import Topbar from '../../Topbar/Topbar';
import DashboardRoutes from './routes';
import { DashboardContainer } from './styles';
import { toggleAll } from '../actions';

const { Content, Footer } = Layout;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(state => state.App.height);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isoContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            <Footer style={styles.footer}>Commando Smollan 2020</Footer>
          </Layout>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
}