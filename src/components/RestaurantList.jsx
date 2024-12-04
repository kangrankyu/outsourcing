import { useState } from 'react';
import useRestaurantsData from './useRestaurantsData';
import styled from 'styled-components';

// styled-components
const ListWrapper = styled.div``;

const ListItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;

  &:hover {
    background-color: #e7f3ff;
  }
`;

const MoreButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #ffffff;
  color: #007bff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e7f3ff;
  }
`;

const RestaurantList = ({ onSelectRestaurant }) => {
  const { data: restaurants, isLoading, error } = useRestaurantsData();
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 검색어를 기준으로 필터링하기 (null 체크 추가)
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name?.includes(searchQuery) ||
      restaurant.address?.includes(searchQuery)
  );

  // 더보기 버튼 클릭 시 표시할 항목 수 + 5
  const handleMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <ListWrapper>
      <input
        type="text"
        placeholder="음식점 이름 또는 주소 검색"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setVisibleCount(5);
        }}
      />

      <div>
        {filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
          <ListItem key={restaurant.id} onClick={() => onSelectRestaurant(restaurant)}>
            <p>{restaurant.name}</p>
            <p>{restaurant.address}</p>
          </ListItem>
        ))}
      </div>

      {visibleCount < filteredRestaurants.length && <MoreButton onClick={handleMoreClick}>더 보기</MoreButton>}
    </ListWrapper>
  );
};

export default RestaurantList;
