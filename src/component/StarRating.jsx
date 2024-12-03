// react-icons에서 별 아이콘을 가져옵니다.
import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { useState } from 'react';

// StarSection이라는 스타일이 적용된 div를 정의합니다.
const StarSection = styled.div`
  // .star 클래스를 가진 요소에 대한 스타일을 정의합니다.
  .star {
    color: blue; // 별의 색상을 파란색으로 설정합니다.
    font-size: 52px; // 별의 크기를 52px로 설정합니다.
    cursor: pointer; // 마우스 커서를 포인터로 변경하여 클릭 가능함을 나타냅니다.
  }
`;

// StarRating 컴포넌트를 정의합니다.
const StarRating = () => {
  // starScore 상태 변수를 정의하고, 초기값을 0으로 설정합니다.
  const [starScore, setStarScore] = useState(0);

  // 컴포넌트의 JSX를 반환합니다.
  return (
    <StarSection>
      {/* 1부터 5까지의 별을 생성하기 위해 Array(5)로 배열을 만듭니다. */}
      {[...Array(5)].map((_, index) => (
        // 각 별에 대한 span 요소를 생성합니다.
        <span key={index + 1} onClick={() => setStarScore(index + 1)}>
          {/* 현재 인덱스가 starScore보다 작거나 같으면 채워진 별을, 그렇지 않으면 빈 별을 표시합니다. */}
          {index + 1 <= starScore ? <FaStar className="star" /> : <FaRegStar className="star" />}
        </span>
      ))}
    </StarSection>
  );
};

// StarRating 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default StarRating;
