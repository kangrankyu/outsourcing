import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../UserProvider';
import { signOutUser } from '../../auth/authapi';

const Navbar = styled.nav`
  background-color: #ffffff;
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2d3748;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // UserContext에서 user와 setUser 가져오기

  const handleLogout = () => {
    // 로컬 스토리지에서 유저와 토큰 정보 삭제
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // 상태 초기화
    
    signOutUser();
    setUser(null);
    // 로그아웃 알림
    alert('로그아웃 되었습니다.');

    // 로그인 페이지로 이동
    navigate('/login');
  };



  return (
    <Navbar>
      <Logo>YEE조 팀 프로젝트</Logo>
      <NavLinks>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/community">게시판</NavLink>

        {user ? (
          <>
            <NavLink to="/mypage">마이 페이지</NavLink>
            <NavLink to="/createpost">게시글 작성</NavLink>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </>
        )}
        {/*         
        {user ? (
          <button onClick={handleLogout}>로그아웃</button>  // 유저가 있을 경우 로그아웃 버튼
        ) : (
          <button onClick={() => navigate("/login")}>로그인</button>  // 유저가 없으면 로그인 버튼
        )} */}
      </NavLinks>
    </Navbar>
  );
};


export default Header;

