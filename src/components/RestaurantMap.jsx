import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useRestaurantsData from './useRestaurantsData';

const RestaurantMap = () => {
  // supabase에서 레스토랑 데이터를 가져오기
  const { data: restaurants, isLoading, error } = useRestaurantsData();

  // 로딩, 에러 처리하기
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 지도 초기 중심 위치 설정하기
  const center = { lat: 37.5665, lng: 126.978 };

  return (
    <Map center={center} style={{ width: '100%', height: '1000px' }}>
      {restaurants.map((restaurant) => (
        <MapMarker
          key={restaurants.id}
          position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
          title={restaurant.name}
        />
      ))}
    </Map>
  );
};

export default RestaurantMap;
