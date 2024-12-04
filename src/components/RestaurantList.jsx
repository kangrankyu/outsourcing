// rename

import { useState } from 'react';
import useRestaurantsData from './useRestaurantsData';
import styled from 'styled-components';

// styled-components
const ListWrapper = styled.div`
  max-width: 800px;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    border-color: #3949ab;
    transition: 0.3s ease;
  }
  &:focus {
    outline: none;
    border-color: #3949ab;
  }
`;

const ListItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.7rem;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #e7f3ff;
  }

  p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
  }

  strong {
    font-size: 1rem;
  }
`;

const MoreButton = styled.button`
  width: 100%;
  margin-top: 1px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RestaurantList = ({ onSelectRestaurant }) => {
  const { data: restaurants, isLoading, error } = useRestaurantsData();
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 검색어를 기준으로 필터링하기
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 더보기 버튼 클릭 시 표시할 항목 수 + 5
  const handleMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <ListWrapper>
      <SearchInput
        type="text"
        placeholder="음식점 이름 또는 주소 검색..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setVisibleCount(5);
        }}
      />

      <div>
        {filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
          <ListItem key={restaurant.id} onClick={() => onSelectRestaurant(restaurant)}>
            <p>
              <strong>{restaurant.name}</strong>
            </p>
            <p>{restaurant.address}</p>
          </ListItem>
        ))}
      </div>

      {visibleCount < filteredRestaurants.length && <MoreButton onClick={handleMoreClick}>더 보기</MoreButton>}
    </ListWrapper>
  );
};

export default RestaurantList;
