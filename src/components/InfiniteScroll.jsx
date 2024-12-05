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
  height: 600px;
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
const CommentsList = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Comment = styled.div`
  background-color: #f1f1f1;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e1e1e1;
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
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글 ID
  const [editCommentContent, setEditCommentContent] = useState(''); // 수정할 댓글 내용

  // 댓글 수정 핸들러
  const handleEditComment = async ({ event, commentId }) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const { data, error } = await supabase
      .from('reviews')
      .update({ content: editCommentContent }) // 수정된 내용을 업데이트
      .match({ id: commentId }) // 수정할 댓글 ID로 필터링
      .select('*'); // 수정된 데이터를 선택

    if (error) {
      return alert(error.message); // 에러 발생 시 알림
    }

    // 댓글 목록 업데이트
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, content: editCommentContent } : comment))
    );
    setEditCommentId(null); // 수정 모드 종료
    setEditCommentContent(''); // 입력 내용 초기화
    alert('댓글이 수정되었습니다!'); // 수정 완료 알림
  };

  // 댓글 수정 버튼 클릭 핸들러
  const handleEditCommentButtonClick = (comment) => {
    setEditCommentId(comment.id); // 수정할 댓글 ID 상태 업데이트
    setEditCommentContent(comment.content); // 댓글 내용 상태 업데이트
  };

  useEffect(() => {
    // 레스토랑 데이터를 가져오는 비동기 함수
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('*').limit(20);
      if (error) {
        return alert(error.message); // 에러 발생 시 알림
      }
      setCards(data); // 가져온 데이터를 상태에 저장
    };

    // 댓글 데이터를 가져오는 비동기 함수
    const fetchComments = async () => {
      const { data, error } = await supabase.from('reviews').select('*');
      if (error) {
        return alert(error.message); // 에러 발생 시 알림
      }
      setComments(data); // 가져온 댓글 데이터를 상태에 저장
    };

    fetchRestaurants(); // 레스토랑 데이터 가져오기 호출
    fetchComments(); // 댓글 데이터 가져오기 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  useEffect(() => {
    // 레스토랑 데이터를 가져오는 비동기 함수
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('*').limit(20);
      if (error) {
        return alert(error.message); // 에러 발생 시 알림
      }
      setCards(data); // 가져온 데이터를 상태에 저장
    };

    // 댓글 데이터를 가져오는 비동기 함수
    const fetchComments = async () => {
      const { data, error } = await supabase.from('reviews').select('*');
      if (error) {
        return alert(error.message); // 에러 발생 시 알림
      }
      setComments(data); // 가져온 댓글 데이터를 상태에 저장
    };

    fetchRestaurants(); // 레스토랑 데이터 가져오기 호출
    fetchComments(); // 댓글 데이터 가져오기 호출
  }, []); // 빈 배열을 전달하

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
    queryKey: ['list'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지의 파라미터 계산
      console.log(lastPage);
      console.log(allPages);
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

  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {data.pages.flat().map((card) =>
            card.id !== editCardId ? ( // 현재 수정 중인 카드가 아니면
              <Card key={card.id}>
                {card.img_url ? (
                  <img src={card.img_url} alt={`${card.name} 이미지`} /> // 카드 이미지
                ) : (
                  <div className="placeholder" /> // 이미지가 없을 경우 플레이스홀더
                )}
                상호명: {card.name}
                <br />
                주소: {card.address}
                <StarDisplay value={card.rating} />
                <CommentsList className="comments-list">
                  {comments.length > 0 ? (
                    comments
                      .filter((comment) => comment.restaurantsid === card.id) // 해당 레스토랑의 댓글 필터링
                      .map((comment) => (
                        <Comment key={comment.id} className="comment">
                          {editCommentId === comment.id ? ( // 수정 모드일 때
                            <form onSubmit={(e) => handleEditComment({ event: e, commentId: comment.id })}>
                              <input
                                type="text"
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)} // 입력 내용 상태 업데이트
                                placeholder="댓글 수정하기"
                              />
                              <button type="submit">수정완료</button>
                            </form>
                          ) : (
                            <>
                              {comment.content}
                              <button type="button" onClick={() => handleEditCommentButtonClick(comment)}>
                                수정하기
                              </button>
                            </>
                          )}
                        </Comment>
                      ))
                  ) : (
                    <p>댓글이 없습니다.</p> // 댓글이 없을 경우 메시지
                  )}
                </CommentsList>
                <form onSubmit={(e) => handleFeebackSubmit({ event: e, restaurantId: card.id })}></form>
                <button type="button" onClick={() => handleClickEditButton(card.id)}>
                  제출하기
                </button>
              </Card>
            ) : (
              <Card key={card.id}>
                {card.img_url ? (
                  <img src={card.img_url} alt={`${card.name} 이미지`} /> // 카드 이미지
                ) : (
                  <div className="placeholder" /> // 이미지가 없을 경우 플레이스홀더
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
                  <input type="text" value={content} onChange={handleContentChange} placeholder="상세리뷰 입력하기" />

                  <button type="submit">제출완료</button>
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
