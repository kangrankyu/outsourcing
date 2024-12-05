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
  margin-top: 80px;
  background-color: #f3f3f3;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
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
  button {
    margin-top: 10px;
    gap: 20px;
  }
`;

// 댓글 목록 스타일 컴포넌트
const CommentsList = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// 개별 댓글 스타일 컴포넌트
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

// 레스토랑 리스트 컴포넌트 정의
function Community() {
  // 상태 변수를 정의합니다.
  const [cards, setCards] = useState([]); // 레스토랑 카드 데이터를 저장
  const [content, setContent] = useState(''); // 리뷰 내용을 저장
  const [rating, setRating] = useState(0); // 리뷰 평점을 저장
  const [editCardId, setEditCardId] = useState(); // 수정할 카드의 ID 저장
  const [comments, setComments] = useState([]); // 댓글 데이터를 저장
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

  // 컴포넌트가 마운트될 때 레스토랑과 댓글 데이터를 가져오는 useEffect
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

  // 리뷰 제출 핸들러
  const handleFeedbackSubmit = async ({ event, restaurantId }) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        rating: parseInt(rating), // 평점을 정수로 변환하여 저장
        content: content, // 리뷰 내용 저장
        restaurantsid: restaurantId // 관련된 레스토랑 ID 저장
      })
      .select('*'); // 새로 추가된 데이터를 선택

    if (error) {
      return alert(error.message); // 에러 발생 시 알림
    }

    setComments([...comments, ...data]); // 새로운 댓글 추가
    setEditCardId(null); // 수정 모드 종료
    setRating(0); // 평점 초기화
    setContent(''); // 리뷰 내용 초기화
    alert('소중한 의견 감사합니다~~!!'); // 제출 완료 알림
  };

  // 리뷰 내용 변경 핸들러
  const handleContentChange = (e) => {
    e.preventDefault(); // 기본 동작 방지
    setContent(e.target.value); // 입력된 값으로 상태 업데이트
  };

  // 수정 버튼 클릭 핸들러
  const handleClickEditButton = (id) => {
    setEditCardId(id); // 수정할 카드 ID 상태 업데이트
    const cardToEdit = cards.find((card) => card.id === id); // 수정할 카드 찾기
    if (cardToEdit) {
      setRating(cardToEdit.rating); // 카드의 평점으로 상태 업데이트
      setContent(cardToEdit.content); // 카드의 내용으로 상태 업데이트
    }
  };

  const handleEdit = useMutation({
    mutationFn: handleFeedbackSubmit // 수정 시 사용할 함수 정의
  });

  return (
    <ListContainer>
      <RestaurantsWrapper>
        <CardContainer>
          {cards.map((card) =>
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
                <form onSubmit={(e) => handleFeedbackSubmit({ event: e, restaurantId: card.id })}></form>
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
                    handleEdit.mutate({
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
          <InfiniteScroll />
          <ScrollToTopButton />
        </CardContainer>
      </RestaurantsWrapper>
    </ListContainer>
  );
}

export default Community; // Community 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
