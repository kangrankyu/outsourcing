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
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3949ab;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #4a5568;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2d3748;
  }
`;

const Header = () => {
  return (
    <Navbar>
      <Logo>YEE조 팀 프로젝트</Logo>
      <NavLinks>
        <NavLink to="/">
          홈
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