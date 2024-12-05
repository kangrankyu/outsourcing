// RestaurantMap.jsx
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useRestaurantsData from './useRestaurantsData';
import RestaurantList from './RestaurantList';
import styled from 'styled-components';

// styled-components
const HeaderHeight = '4rem';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${HeaderHeight});
  margin-top: ${HeaderHeight};
  box-sizing: border-box;
`;

const ListContainer = styled.div`
  width: 20%;
  overflow-y: auto;
  background-color: #f9fafb;
`;

const MapContainer = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: auto;
`;

const RestaurantMap = () => {
  // 선택된 레스토랑을 관리하는 상태
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // supabase에서 레스토랑 데이터를 가져오기
  const { data: restaurants, isLoading, error } = useRestaurantsData();

  // 로딩, 에러 처리하기
  if (isLoading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 지도 중심 위치 설정하기
  const center = selectedRestaurant
    ? { lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }
    : { lat: 37.5665, lng: 126.978 };

  return (
    <Container>
      <ListContainer>
        <RestaurantList onSelectRestaurant={setSelectedRestaurant} />
      </ListContainer>

      <MapContainer>
        <Map center={center} style={{ width: '100%', height: '100vh' }}>
          {restaurants &&
            restaurants.map((restaurant) => (
              <MapMarker
                key={restaurant.id}
                position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                title={restaurant.name}
              />
            ))}
        </Map>
      </MapContainer>
    </Container>
  );
};

export default RestaurantMap;
