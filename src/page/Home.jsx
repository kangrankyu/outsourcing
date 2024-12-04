import styled from 'styled-components';
import RestaurantMap from '../components/RestaurantMap';

// styled-components
const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Home = () => {
  return (
    <>
      <Content>
        <RestaurantMap />
      </Content>
    </>
  );
};

export default Home;
