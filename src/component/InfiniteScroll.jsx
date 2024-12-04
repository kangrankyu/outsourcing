import { useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
// import StarRating from '../component/StarRating'; // 별점 평가를 위한 컴포넌트 임포트
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import StarRating from './StarRating';
import StarDisplay from './StarDisplay';

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

// Supabase 클라이언트 생성
const supabase = createClient(
  'https://kdszztcbvfcmmyihescu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3p6dGNidmZjbW15aWhlc2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NTkxMDcsImV4cCI6MjA0ODQzNTEwN30.McDkEK7_LJ7410e6qtGpK5lNT60RfUThHmDPO4PsIf0'
);

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
  const [content, setConTent] = useState('');
  const [rating, setRating] = useState(0);
  const [editCardId, setEditCardId] = useState();

  const handleFeebackSubmit = async (e, restaurantId) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: name, // 이름 (여기서 name 변수는 선언되어야 함)
        rating: parseInt(rating), // 평점
        content: content,
        restaurantsid: restaurantId
      })
      .select('*');
    if (error) {
      return alert(error.message);
    }
    setConTent([...content, ...data]);
  };

  const handleContentChange = (e) => {
    setConTent(e.target.value);
  };

  //   const handleRatingChange = (e) => {
  //     setRating(e.target.value);
  //   };

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

  const handleClickEditButton = (cardId) => {
    setEditCardId(cardId);
  };

  // 데이터가 로딩되었을 때의 UI 구성
  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {data.pages.flat().map((card) => {
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
                  <form onSubmit={(e) => handleFeebackSubmit(e, card.id)}>
                    <StarRating setRating={setRating} value={rating} />
                    <input
                      type="text"
                      value={card.content} // 카드 내용 상태값
                      onChange={handleContentChange} // 내용 변경 핸들러
                      placeholder="상세리뷰 입력하기" // 입력란에 표시될 텍스트
                    ></input>
                    <button onClick={handleFeedBackEdit.mutate}>수정완료</button>
                  </form>
                </Card>
              );
            }
          })}

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
