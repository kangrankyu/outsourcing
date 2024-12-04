import { FaRegStar, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarSection = styled.div`
  .star {
    color: blue;
    font-size: 52px;
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
