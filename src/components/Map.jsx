import { useEffect, useState, useRef } from 'react';
import useFetchRestaurants from './useFetchRestaurants';
import useMapMarkers from './useMapMarkers';

const Map = () => {
  const mapContainer = useRef(null);
  const restaurants = useFetchRestaurants();
  const [map, setMap] = useState(null);

  // 카카오맵 api에서 마커를 표시한다.
  useEffect(() => {
    if (restaurants.length === 0) return;

    const { kakao } = window;
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978), //지도의 중심좌표
      level: 5 // 지도의 확대 레벨 (3 ~ 5 사이 추천)
    };

    const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);
    setMap(mapInstance);
  }, [restaurants]);

  useMapMarkers(map, restaurants, setMap);

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '1000px'
        }}
      ></div>
    </>
  );
};

export default Map;