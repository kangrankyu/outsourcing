import Home from '../../page/Home';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
};

export default Layout;

// TODO
// 1) rrd가 제공하는 navlink, outlet 사용하기
// outlet은 content가 담길 곳을 명시하는 것
