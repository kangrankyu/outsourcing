import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box; // 잘림방지
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b6cb0; /* text-blue-600 */
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #4a5568; /* text-gray-700 */
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2d3748; /* text-gray-800 */
  }
`;

const Header = () => {
  return (
    <Navbar>
      <Logo>MyWebsite</Logo>
      <NavLinks>
        <NavLink to="/">
          홈
        </NavLink>
        <NavLink to="/community">
          커뮤니티
        </NavLink>
        <NavLink to="/board">
          게시판
        </NavLink>
        <NavLink to="/mypage">
          마이 페이지
        </NavLink>
      </NavLinks>
    </Navbar>
  );
};

export default Header;

// <Link>는 <a>태그처럼 링크를 연결하지만 url과는 다른 path 개념
// Link 컴포넌트 사용으로 이동하고자 하는 경로(url)로 이동할 수 있다.
// 브라우저의 주소만 바꿀 뿐 페이지를 새로 불러오지 않는다.
// 나 NavLink 잘 쓸줄몰라...