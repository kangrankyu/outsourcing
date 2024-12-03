import { useEffect, useRef } from 'react';
import useFetchRestaurants from './useFetchRestaurants';


const Map = () => {
  const mapContainer = useRef(null);
  const restaurants = useFetchRestaurants();

  // createMarker: 마커, 인포윈도우를 생성하는 함수
  const createMarker = (map, restaurant) => {
    const { kakao } = window;

    // 좌표에 마커를 생성한다.
    const markerCoordinates = new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
    const marker = new kakao.maps.Marker({
      position: markerCoordinates
    });

    // 커스텀 오버레이 내용을 작성한다.(테스트용)
    const overlayContent = `
       <div style="border-radius:5px; overflow:hidden; width:250px; text-align:center; font-size:12px; border:1px solid #333; background:#fff;">
        <div style="padding:10px; font-weight:bold;">${restaurant.name}</div>
        <div style="padding:5px;">
          ${
            restaurant.img_url
              ? `<img src="${restaurant.img_url}" alt="${restaurant.name}" style="width:100%; height:auto;" />`
              : ''
          }
        </div>
        <div style="padding:5px;">주소: ${restaurant.address}</div>
        ${restaurant.tel ? `<div style="padding:5px;">전화번호: ${restaurant.tel}</div>` : ''}
        <button onclick="closeOverlay()" style="margin:10px; padding:5px; cursor:pointer;">닫기</button>
      </div>
    `;

    // 좌표에 커스텀 오버레이를 생성한다.
    const overlay = new kakao.maps.CustomOverlay({
      content: overlayContent,
      map: null,
      position: markerCoordinates,
      removeable: true // 오버레이 제거 기능
    });

    // 마커를 지도에 추가한다.
    marker.setMap(map);

    // 마커에 클릭 이벤트를 등록한다.
    kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(map);
    });
  };

  // 카카오맵 api에서 마커를 표시한다.
  useEffect(() => {
    // initializeMap: 지도와 마커를 설정하는 함수(지도 초기화)
    const initializeMap = (restaurants) => {
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
    };

    if (restaurants.length > 0) {
      initializeMap(restaurants);
    }
  }, [restaurants]);

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

export default Map;

// TODO
// 1. 커스텀 오버레이 닫기 기능 구현하기
// 2. 음식점 이름으로 검색하는 기능 구현하기 및 목록 출력
// 3. ui 개선
