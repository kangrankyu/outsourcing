import { useCallback, useEffect, useRef } from 'react';
import useFetchRestaurants from './useFetchRestaurants';


const MapComponent = () => {
  const mapContainer = useRef(null);
  const restaurants = useFetchRestaurants();

  // createMarker: 마커, 인포윈도우를 생성하는 함수
  const createMarker = useCallback((map, restaurant, infowindow) => {
    const { kakao } = window;
    const markerCoordinates = new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
    const marker = new kakao.maps.Marker({
      position: markerCoordinates // 좌표에 마커 생성
    });

    // 마커를 지도에 추가한다.
    marker.setMap(map);

    // 마커에 클릭 이벤트를 등록한다.(간단하게 음식점 이름 아니면 뭐 모달을 추가할까요..?)
    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${restaurant.name}</div>`);
      infowindow.open(map, marker);
    });
  }, []);

  // initializeMap: 지도와 마커를 설정하는 함수(지도 초기화 포함)
  const initializeMap = useCallback((restaurants) => {
    const { kakao } = window;
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978), //지도의 중심좌표
      level: 5 // 지도의 확대 레벨 (3 ~ 5 사이 추천)
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOption); // 지도
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 인포윈도우

    // 마커를 생성하고 지도에 표시한다.
    restaurants.forEach((restaurant) => {
      createMarker(map, restaurant, infowindow);
    });
  }, [createMarker]);

  // 카카오맵 api에서 마커를 표시한다.
  useEffect(() => {
    if (restaurants.length > 0) {
      initializeMap(restaurants);
    }
  }, [restaurants, initializeMap]);

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          width: '1000px',
          height: '1000px'
        }}
      ></div>
    </>
  );
};

export default MapComponent;

// TODO
// 1. 컴포넌트 분리
// 1-1. supabase에서 데이터 가져오는 함수
// 1-2. 지도를 초기화하는 함수(지도랑 마커 설정하는 로직 넣기)
// 1-3. 마커 생성하는 함수..도 더 분리할까? 몰라

// 2. 로딩 상태 관리 추가(지도 가져올 때)

// 3. useCallback 사용..해..ㅂ..보기 근데 어디다..? 개억지콜백가능?
// 3-1. 지금 프로젝트에서 restaurants이 변할 일도 없고 useCallback 써봤자 오히려 메모리낭비지만 그래도 학습목적이면 사용해도 ok