import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  //   isVisible은 버튼이 보이는지 여부를 나타내는 상태입니다. 초기값은 false로 설정
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  //   handleScroll 함수는 사용자가 페이지를 스크롤할 때 호출됩니다. 스크롤 위치가 300 픽셀을 초과하면 버튼을 보이도록 설정하고, 그렇지 않으면 숨깁
  const scrollToTop = () => {
    window.scrollTo({
      top: 0
      // behavior: "smooth",
    });
  };
  //   scrollToTop 함수는 버튼 클릭 시 페이지를 부드럽게 위로 스크롤
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //   컴포넌트가 마운트될 때 scroll 이벤트 리스너를 추가하고, 언마운트될 때 이를 제거. 이로 인해 스크롤 이벤트에 대한 핸들러가  작동
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.button}>
          ↑
        </button>
      )}
    </>
  );
};
// isVisible이 true일 때만 위로 스크롤 버튼이 렌더링. 버튼을 클릭하면 scrollToTop 함수가 호출되어 페이지가 위로 스크롤
const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    fontSize: '18px',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ScrollToTopButton;





