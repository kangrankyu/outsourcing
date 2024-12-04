import ScrollToTopButton from '../components/ScrollToTopButton'; // 스크롤 상단 버튼 컴포넌트 임포트
import styled from 'styled-components'; // 스타일링을 위한 styled-components 임포트
import { useEffect, useState } from 'react'; // React의 useEffect와 useState 훅 임포트
import InfiniteScroll from '../components/InfiniteScroll'; // 무한 스크롤을 위한 컴포넌트 임포트
import StarRating from '../components/StarRating'; // 별점 평가를 위한 컴포넌트 임포트
import StarDisplay from '../components/StarDisplay';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../supabase/supabaseClient';

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
  height: 450px;
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
  button {
    margin-top: 10px;
  }
`;

// 레스토랑 리스트 컴포넌트 정의
function Community() {
  const [cards, setCards] = useState([]); // 카드 데이터를 위한 상태 변수
  const [content, setConTent] = useState(''); // 리뷰 내용을 위한 상태 변수
  const [rating, setRating] = useState(0); // 평점을 위한 상태 변수
  const [editCardId, setEditCardId] = useState();

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
  const handleFeebackSubmit = async ({ event, restaurantId }) => {
    // onSubmit의 기본 동작인 새로고침 방지
    event.preventDefault();
    const { data, error } = await supabase
      .from('reviews') // 리뷰 테이블에 데이터 삽입
      .insert({
        rating: parseInt(rating), // 평점
        content: content,
        restaurantsid: restaurantId
      })
      .select('*');

    if (error) {
      return alert(error.message); // 에러 발생 시 경고창 표시
    }

    setConTent([...content, ...data]);

    // 피드백 제출 로직 추가
    // 완료 후 editCardId 초기화
    setEditCardId(null);
    // 필요한 경우 상태 초기화
    setRating(0);
    setConTent(''); // 리뷰 데이터 업데이트
    alert('소중한 의견 감사합니다~~!!');
  };

  // 리뷰 내용 변경 핸들러
  const handleContentChange = (e) => {
    e.preventDefault();
    setConTent(e.target.value); // 입력된 값으로 상태 업데이트
  };

  const handleClickEditButton = (id) => {
    setEditCardId(id);
    // 필요한 경우 초기화
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setRating(cardToEdit.rating);
      setConTent(cardToEdit.content);
    }
  };

  const handleEdit = useMutation({
    mutationFn: handleFeebackSubmit
  });

  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {cards.map((card) =>
            card.id !== editCardId ? (
              <Card key={card.id}>
                {card.img_url ? (
                  <img src={card.img_url} alt={`${card.name} 이미지`} />
                ) : (
                  <div className="placeholder" />
                )}
                상호명: {card.name}
                주소: {card.address}
                <StarDisplay value={card.rating} />
                리뷰: {card.review}
                <button type="button" onClick={() => handleClickEditButton(card.id)}>
                  수정하기
                </button>
              </Card>
            ) : (
              <Card key={card.id}>
                {card.img_url ? (
                  <img src={card.img_url} alt={`${card.name} 이미지`} />
                ) : (
                  <div className="placeholder" />
                )}
                <form
                  onSubmit={(e) =>
                    handleEdit.mutate({
                      event: e,
                      restaurantId: card.id
                    })
                  }
                >
                  <StarRating setRating={setRating} value={rating} />
                  <input
                    type="text"
                    value={content} // 카드 내용 상태값
                    onChange={handleContentChange} // 내용 변경 핸들러
                    placeholder="상세리뷰 입력하기" // 입력란에 표시될 텍스트
                  />
                  <button type="submit">수정완료</button>
                </form>
              </Card>
            )
          )}
          <InfiniteScroll />
          <ScrollToTopButton />
        </CardContainer>
      </RestaurantsWrapper>
    </ListContainer>
  );
}
export default Community; // 컴포넌트 내보내기
