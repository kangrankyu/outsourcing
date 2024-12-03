import { useState } from "react";
import { InputStyle, Pagination, PlaceItem, PlaceList, SearchButton, Wrapper } from "../styles/PlaceSearchStyle";
const { kakao } = window;

// 한 페이지에 표시할 항목 수
const ITEMS_PER_PAGE = 5;

function PlaceSearch({ onSelectAddress }) {
    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 전체 항목 수 페이지당 항목 수로 나누기
    const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE);
    // 현재 페이지에서 표시할 항목의 시작 인덱스
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // 현재 페이지에 표시할 장소 목록
    const currentPlace = places.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // 카카오 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places(); 

    const handleSearch = () => {
        if (!keyword.trim()) {
            alert('키워드를 입력해주세요!');
            return;
        }

        // 장소검색 객체를 통해 키워드로 장소검색 요청
        ps.keywordSearch(keyword, placesSearchCB);
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    const placesSearchCB = (data, status) => {
        // 정상적으로 검색이 완료되면 결과 상태에 저장
        if (status === kakao.maps.services.Status.OK) {
            setPlaces(data);
            // 검색 후 첫 페이지로 초기화
            setCurrentPage(1);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    };

    // 장소 선택 시 호출되는 함수
    const handlePlaceSelect = (place) => {
        const address = place.road_address_name || place.address_name;
        console.log({ place });
        onSelectAddress(address);
    };

    return (
        <Wrapper>
            <InputStyle
                type="text"
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="장소를 입력하세요"
            />
            <SearchButton type="button" onClick={handleSearch}>검색</SearchButton>
            <PlaceList>
                {currentPlace.map((place, index) => (
                    <PlaceItem key={index} onClick={() => handlePlaceSelect(place)}>
                        <h3>{place.place_name}</h3>
                        <p>{place.road_address || place.address}</p>
                    </PlaceItem>
                ))}
            </PlaceList>
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        // 현재 페이지와 버튼의 페이지 번호가 같으면 비활성화
                        disabled={currentPage === index + 1}>
                        {index+1}
                    </button>
                ))}
            </Pagination>
        </Wrapper>
    );
}

export default PlaceSearch;