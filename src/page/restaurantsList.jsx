import { createClient } from '@supabase/supabase-js'; // Supabase 클라이언트를 생성하기 위한 패키지 임포트
import ScrollToTopButton from '../component/ScrollToTopButton'; // 스크롤 상단 버튼 컴포넌트 임포트
import styled from 'styled-components'; // 스타일링을 위한 styled-components 임포트
import { useEffect, useState } from 'react'; // React의 useEffect와 useState 훅 임포트
import InfiniteScroll from '../component/InfiniteScroll'; // 무한 스크롤을 위한 컴포넌트 임포트
import StarRating from '../component/StarRating'; // 별점 평가를 위한 컴포넌트 임포트
import StarDisplay from '../component/StarDisplay';
import { useMutation } from '@tanstack/react-query';

// 페이지 전체를 감싸는 컨테이너 스타일 정의
const ListContainer = styled.div`
  background-color: #f3f3f3;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 닉네임 래퍼 스타일 정의
const RestaurantsWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

// 카드들을 감싸는 컨테이너 스타일 정의
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: start;
  width: 100%;
  max-width: 1200px;
`;

// 개별 카드 스타일 정의
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: calc(25% - 30px);
  height: 350px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  .placeholder {
    width: 100%;
    height: 180px;
    background-color: #ddd;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  p {
    margin: 4px 0;
    font-size: 12px;
    color: #555;
  }
`;

// 레스토랑 리스트 컴포넌트 정의
function RestaurantsList() {
  const [cards, setCards] = useState([]); // 카드 데이터를 위한 상태 변수
  const [content, setConTent] = useState(''); // 리뷰 내용을 위한 상태 변수
  const [rating, setRating] = useState(0); // 평점을 위한 상태 변수
  const [editCardId, setEditCardId] = useState();

  // Supabase 클라이언트 생성
  const supabase = createClient(
    'https://kdszztcbvfcmmyihescu.supabase.co', // Supabase 프로젝트 URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3p6dGNidmZjbW15aWhlc2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NTkxMDcsImV4cCI6MjA0ODQzNTEwN30.McDkEK7_LJ7410e6qtGpK5lNT60RfUThHmDPO4PsIf0' // Supabase API 키
  );

  // 컴포넌트가 마운트될 때 레스토랑 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('*').limit(20); // 초기값 20개만 가져오기

      if (error) {
        return alert(error.message); // 에러 발생 시 경고창 표시
      }
      setCards(data); // 가져온 데이터로 카드 상태 업데이트
      console.log(data); // 콘솔에 데이터 출력
    };
    fetchRestaurants(); // 함수 호출
  }, []);

  // 리뷰 제출 핸들러
  const handleFeebackSubmit = async (e, restaurantId) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 방지

    const { data, error } = await supabase
      .from('reviews') // 리뷰 테이블에 데이터 삽입
      .insert({
        name: name, // 이름 (여기서 name 변수는 선언되어야 함)
        rating: parseInt(rating), // 평점
        content: content,
        restaurantsid: restaurantId
        // 리뷰 내용
      })
      .select('*');
    // 삽입 후 모든 데이터 선택

    if (error) {
      return alert(error.message); // 에러 발생 시 경고창 표시
    }
    setConTent([...content, ...data]); // 리뷰 데이터 업데이트
    alert('소중한 의견 감사합니다~~!!');
  };

  // 리뷰 내용 변경 핸들러
  const handleContentChange = (e) => {
    e.preventDefault();
    setConTent(e.target.value); // 입력된 값으로 상태 업데이트
  };

  // 평점 변경 핸들러
  // const handleRatingChange = (e) => {
  //   e.preventDefault();
  //   setRating(e.target.value); // 선택된 평점으로 상태 업데이트
  // };

  const handleClickEditButton = (cardId) => {
    setEditCardId(cardId);
  };

  const handleEdit = useMutation({
    mutationFn: handleFeebackSubmit
  });
  //

  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {cards.map((card) => {
            // console.log(editCardId, card.id);
            if (card.id !== editCardId) {
              return (
                <Card key={card.id}>
                  {card.img_url ? (
                    <img src={card.img_url} alt={`${card.name} 이미지`} />
                  ) : (
                    <div className="placeholder" />
                  )}
                  상호명: {card.name}
                  주소: {card.address}
                  별점: <StarDisplay value={rating} />
                  리뷰: {card.review}
                  <button type="button" onClick={() => handleClickEditButton(card.id)}>
                    수정하기
                  </button>
                </Card>
              );
            } else {
              return (
                <Card key={card.id}>
                  <form onSubmit={(e) => {
          e.preventDefault(); // 기본 폼 제출 방지
          handleFeebackSubmit(e, card.id); // 피드백 제출
        }}>
                    <StarRating setRating={setRating} value={rating} />
                    <input
                      type="text"
                      value={card.content} // 카드 내용 상태값
                      onChange={handleContentChange} // 내용 변경 핸들러
                      placeholder="상세리뷰 입력하기" // 입력란에 표시될 텍스트
                    ></input>
                    <button onClick={handleEdit.mutate}>수정완료</button>
                  </form>
                </Card>
              );
            }
          })}
          <InfiniteScroll />
          <ScrollToTopButton />
        </CardContainer>
      </RestaurantsWrapper>
    </ListContainer>
  );
}

export default RestaurantsList; // 컴포넌트 내보내기

// 버튼을 눌렀을떄 입력한평점과 코멘트를 데이터베이스에 연결해서 사용하기
