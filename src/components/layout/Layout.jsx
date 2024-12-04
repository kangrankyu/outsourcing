import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;

// TODO
// 1) rrd가 제공하는 navlink, outlet 사용하기
// outlet은 content가 담길 곳을 명시하는 것
