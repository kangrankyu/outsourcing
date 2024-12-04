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
  height: 100vh;
  margin-top: ${HeaderHeight};
  box-sizing: border-box; // 전체적인 계산에 패딩 포함
`;

const ListContainer = styled.div`
  width: 20%;
  overflow: hidden;
  overflow-y: auto;
  background-color: #ffffff;
`;

const MapContainer = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: auto;
`;

const RestaurantMap = () => {
  // 선택된 레스토랑을 관리하는 상태
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // supabase에서 레스토랑 데이터를 가져오는 훅
  const { data: restaurants, isLoading, error } = useRestaurantsData();

  // 로딩 중이거나 에러가 발생한 경우
  if (isLoading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 지도 중심 위치 설정하기
  const center = selectedRestaurant
    ? { lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }
    : { lat: 37.5665, lng: 126.978 }; // 초기 중심 좌표는 서울로 설정

  return (
    <Container>
      {/* 레스토랑 목록을 왼쪽에 표시 */}
      <ListContainer>
        <RestaurantList onSelectRestaurant={setSelectedRestaurant} />
      </ListContainer>

      {/* 지도 부분을 오른쪽에 표시 */}
      <MapContainer>
        <Map center={center} style={{ width: '100%', height: '100%' }}>
          {restaurants.map((restaurant) => (
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
