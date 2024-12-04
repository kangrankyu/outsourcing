import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import StarRating from './StarRating';
import StarDisplay from './StarDisplay';
import { supabase } from '../supabase/supabaseClient';

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
`;

// 게시물을 가져오는 비동기 함수
const fetchPosts = async ({ pageParam = 0 }) => {
  const limit = 6; // 한 번에 가져올 데이터 개수
  const { data, error } = await supabase
    .from('restaurants') // 'restaurants' 테이블에서 데이터 가져오기
    .select('*') // 모든 컬럼 선택
    .range(pageParam, pageParam + limit - 1); // 지정된 범위의 데이터 가져오기

  if (error) throw new Error(error.message); // 에러 발생 시 예외 처리
  return data; // 데이터 반환
};

// 무한 스크롤 컴포넌트 정의
const InfiniteScroll = () => {
  const [cards, setCards] = useState([]);
  const [content, setConTent] = useState('');
  const [rating, setRating] = useState(0);
  const [editCardId, setEditCardId] = useState();

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

  // useInfiniteQuery 훅을 사용하여 데이터를 가져오고 상태를 관리
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['restaurants'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지의 파라미터 계산
        

      return lastPage.length ? allPages.length * 6 : undefined; // 다음 페이지의 시작 인덱스
    }
  });

  // 요소가 뷰포트에 들어오는지 감지하는 훅
  const { ref, inView } = useInView({
    threshold: 1 // 100% 보일 때
  });

  // inView가 true가 되고, 다음 페이지가 존재하는 경우 fetchNextPage 호출
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage(); // 다음 페이지 데이터 가져오기
    }
  }, [inView, hasNextPage, fetchNextPage]);
  // 의존성 배열
  const handleFeedBackEdit = useMutation({
    mutationFn: handleFeebackSubmit
  });

  // 로딩 중일 때 표시할 내용
  if (isLoading) return <div>Loading...</div>;
  // 에러가 발생했을 때 표시할 내용
  if (isError) return <div>Error loading posts</div>;

  const handleClickEditButton = (id) => {
    setEditCardId(id);
    // 필요한 경우 초기화
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setRating(cardToEdit.rating);
      setConTent(cardToEdit.content);
    }
  };

  // 데이터가 로딩되었을 때의 UI 구성
  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {data.pages.flat().map((card) =>
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
                  수정하기2222
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
                    handleFeedBackEdit.mutate({
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
          <div>
            <div ref={ref} style={{ height: '200px' }} />
            {!hasNextPage && <div style={{ backgroundColor: '#3949ab' }}>더 이상 데이터가 없습니다.</div>}
          </div>
        </CardContainer>
      </RestaurantsWrapper>
    </ListContainer>
  );
};

export default InfiniteScroll;
