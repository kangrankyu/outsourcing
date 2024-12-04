import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarSection = styled.div`
  display: flex;
  .star {
    color: blue;
    font-size: 52px;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StarDisplay = ({ value }) => {
  return (
    <StarSection>
      {[...Array(5)].map((_, index) =>
        index + 1 <= value ? (
          <FaStar key={index + 1} className="star" />
        ) : (
          <FaRegStar key={index + 1} className="star" />
        )
      )}
    </StarSection>
  );
};

export default StarDisplay;
