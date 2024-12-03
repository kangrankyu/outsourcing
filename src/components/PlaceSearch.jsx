// import { useState } from "react";
// const { kakao } = window;

// function PlaceSearch() {
//     const [keyword, setKeyword] = useState('');
//     const [places, setPlaces] = useState([]);

//     const ps = new kakao.maps.services.Places(); // 카카오 장소 검색 객체 생성

//     const handleSearch = () => {
//         if (!keyword.trim()) {
//             alert('키워드를 입력해주세요!');
//             return;
//         }

//         // 장소검색 객체를 통해 키워드로 장소검색 요청
//         ps.keywordSearch(keyword, placesSearchCB);
//     };

//     // 장소검색이 완료됐을 때 호출되는 콜백함수
//     const placesSearchCB = (data, status, pagination) => {
//         if (status === window.kakao.maps.services.Status.OK) {
//             // 정상적으로 검색이 완료되면 결과 상태에 저장
//             setPlaces(data);
//         } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
//             alert('검색 결과가 존재하지 않습니다.');
//         } else if (status === window.kakao.maps.services.Status.ERROR) {
//             alert('검색 결과 중 오류가 발생했습니다.');
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 id="keyword"
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//                 placeholder="장소를 입력하세요"
//             />
//             <button onClick={handleSearch}>검색</button>
//             <ul>
//                 {places.map((place, index) => (
//                     <li key={index}>
//                         <h3>{place.place_name}</h3>
//                         <p>{place.road_address || place.address}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default PlaceSearch;