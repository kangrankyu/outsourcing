import useFetchRestaurants from './useFetchRestaurants';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #ffffff;
  width: 20%;
  max-height: 100vh;
  overflow-y: auto;
  overflow: hidden;
`;

const ListHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;

  &:hover {
    background-color: #e7f3ff;
  }
`;

const RestaurantList = () => {
  const restaurants = useFetchRestaurants();

  return (
    <>
      <ListContainer>
        <ListHeader>Restaurant List</ListHeader>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <p>{restaurant.name}</p>
            <p>{restaurant.address}</p>
          </ListItem>
        ))}
      </ListContainer>
    </>
  );
};

export default RestaurantList;
