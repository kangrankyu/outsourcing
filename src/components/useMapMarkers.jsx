import { useEffect } from 'react';

const useMapMarkers = (map, restaurants) => {
  useEffect(() => {
    if (!map || restaurants.length === 0) return;

    const { kakao } = window;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 인포윈도우

    // 마커를 생성하는 함수
    const setMarker = (restaurant) => {
      const markerCoordinates = new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude);
      const marker = new kakao.maps.Marker({
        position: markerCoordinates
      });

      // 마커를 지도에 추가한다.
      marker.setMap(map);

      // 마커에 클릭 시 이벤트를 등록한다.
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(`<div style="padding:5px;font-size:12px;">${restaurant.name}</div>`);
        infowindow.open(map, marker);
      });
    };

    // 여러 개의 마커를 생성한다.
    restaurants.forEach((restaurant) => {
      setMarker(restaurant);
    });
  }, [map, restaurants]);
};

export default useMapMarkers;
