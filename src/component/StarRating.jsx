import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarSection = styled.div`
  .star {
    color: blue;
    font-size: 52px;
    cursor: pointer;
  }
`;

const StarRating = ({ setRating, value }) => {
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <StarSection>
      {[...Array(5)].map((_, index) => (
        <label key={index + 1} onClick={() => handleStarClick(index)}>
          {index + 1 <= value ? <FaStar className="star" /> : <FaRegStar className="star" />}
        </label>
      ))}
    </StarSection>
  );
};

export default StarRating;

// import { FaRegStar, FaStar } from 'react-icons/fa';
// import styled from 'styled-components';
// //   import { useState } from 'react';

// // StarSection이라는 스타일이 적용된 div를 정의합니다.
// const StarSection = styled.div`
//  .star {
//    color: blue; // 별의 색상을 파란색으로 설정합니다.
//     font-size: 52px; // 별의 크기를 52px로 설정합니다.
//     cursor: pointer; // 마우스 커서를 포인터로 변경하여 클릭 가능함을 나타냅니다.
//   }
// `;

// //  StarRating 컴포넌트를 정의합니다.
// const StarRating = ({ setRating, value }) => {
//    // starScore 상태 변수를 정의하고, 초기값을 0으로 설정합니다.

//   // 별을 클릭할 때 호출되는 함수
//   const handleStarClick = (index) => {
//     setRating(index + 1);
//     console.log(index);
//   };

//   // 컴포넌트의 JSX를 반환합니다.
//   return (
//     <StarSection>
//       {/* 1부터 5까지의 별을 생성하기 위해 Array(5)로 배열을 만듭니다. */}
//       <input
//         type="radio"
//         name="star"
//         value={value}
//         style={{ display: 'none' }} // 기본 input 요소는 숨깁니다.
//         readOnly // 이 input은 사용자가 직접 수정할 수 없도록 설정
//      />
//      {[...Array(5)].map((_, index) => (
//        <label key={index + 1} onClick={() => handleStarClick(index)}>
//          {/* 현재 인덱스가 starScore보다 작거나 같으면 채워진 별을, 그렇지 않으면 빈 별을 표시합니다. */}
//          {index + 1 <= value ? <FaStar className="star" /> : <FaRegStar className="star" />}
//       </label>
//      ))}
//    </StarSection>
//  );
// };

// export default StarRating;










