// 필요한 라이브러리와 모듈을 임포트합니다.
import { useQuery } from '@tanstack/react-query'; // React Query를 사용하여 데이터를 가져옵니다.
import styled from 'styled-components'; // styled-components를 사용하여 스타일을 정의합니다.
import supabase from '../utils/supabaseClient'; // Supabase 클라이언트를 임포트하여 데이터베이스와의 상호작용을 합니다.

// Styled Components를 사용하여 페이지의 스타일을 정의합니다.
const PageContainer = styled.div`
  background-color: #f3f3f3; // 페이지 배경 색상 설정
  padding: 20px; // 페이지 내부 여백 설정
  min-height: 100vh; // 페이지의 최소 높이를 화면 전체로 설정
`;

const NicknameWrapper = styled.div`
  margin-bottom: 20px; // 닉네임 래퍼 아래쪽 여백 설정
  h2 {
    font-size: 24px; // 닉네임 크기 설정
    font-weight: bold; // 닉네임 두껍게 설정
  }
`;

const CardContainer = styled.div`
  display: flex; // 카드 컨테이너를 플렉스 박스로 설정
  flex-wrap: wrap; // 카드가 줄 바꿈되도록 설정
  gap: 50px; // 카드 사이의 간격 설정
`;

const Card = styled.div`
  border: 1px solid #ccc; // 카드 테두리 설정
  padding: 16px; // 카드 내부 여백 설정
  width: 20%; // 카드 너비 설정
  border-radius: 8px; // 카드 모서리 둥글게 설정
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 카드 그림자 설정
  transition: // 카드의 트랜지션 효과 설정
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover { // 카드에 마우스를 올렸을 때의 효과
    transform: translateY(-5px); // 카드 위로 이동
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 그림자 효과 변경
  }
  img {
    width: 100%; // 이미지 너비 100%로 설정
    height: 150px; // 이미지 높이 고정
    object-fit: cover; // 이미지 비율 유지하며 잘리도록 설정
    border-radius: 4px; // 이미지 모서리 둥글게 설정
    margin-bottom: 12px; // 이미지 아래쪽 여백 설정
  }
  .placeholder { // 이미지가 없을 때 표시할 플레이스홀더 스타일
    width: 100%; // 너비 100%로 설정
    height: 150px; // 높이 고정
    background-color: #ddd; // 배경색 설정
    border-radius: 4px; // 모서리 둥글게 설정
    margin-bottom: 12px; // 아래쪽 여백 설정
  }
  h3 {
    font-size: 16px; // 상호명 크기 설정
    font-weight: bold; // 상호명 두껍게 설정
    margin-bottom: 8px; // 아래쪽 여백 설정
  }
  p {
    margin: 4px 0; // 상하 여백 설정
    font-size: 12px; // 텍스트 크기 설정
    color: #555; // 텍스트 색상 설정
  }
`;

// MyPage 컴포넌트 정의
const MyPage = () => {
  // 닉네임을 가져오는 쿼리
  const { data: nickname, isLoading: isNicknameLoading } = useQuery({
    queryKey: ['nickname'], // 쿼리 키 설정
    queryFn: async () => { // 비동기 함수 정의
      const { data: { user } } = await supabase.auth.getUser(); // 현재 사용자 정보 가져오기
      const { data } = await supabase.from('users').select('nickname').eq('id', user.id).single(); // 사용자 닉네임 가져오기
      return data?.nickname; // 닉네임 반환
    }
  });

  // 리뷰를 가져오는 쿼리
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ['reviews'], // 쿼리 키 설정
    queryFn: async () => { // 비동기 함수 정의
      const { data: { user } } = await supabase.auth.getUser(); // 현재 사용자 정보 가져오기
      const { data } = await supabase
        .from('reviews')
        .select('id, content, rating, name, address, img_url') // 필요한 필드 선택
        .eq('user_id', user.id); // 현재 사용자 ID로 필터링
      return data || []; // 리뷰 데이터 반환, 없으면 빈 배열 반환
    }
  });

  // 데이터 로딩 중일 때 로딩 메시지 표시
  if (isNicknameLoading || isReviewsLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  // 데이터 로딩이 끝나면 페이지 내용 반환
  return (
    <PageContainer>
      <NicknameWrapper>
        <h2>{nickname}님</h2> {/* 사용자 닉네임 표시 */}
      </NicknameWrapper>
      <CardContainer>
        {reviews.map((review) => ( // 리뷰 데이터를 맵으로 돌려 카드 생성
          <Card key={review.id}>
            {review.img_url ? ( // 이미지 URL이 있을 경우
              <img src={review.img_url} alt={`${review.name} 이미지`} />
            ) : ( // 이미지 URL이 없을 경우 플레이스홀더 표시
              <div className="placeholder" />
            )}
            <h3>상호명 : {review.name}</h3> {/* 상호명 표시 */}
            <p>주소 : {review.address}</p> {/* 주소 표시 */}
            <p>평점: {review.rating}</p> {/* 평점 표시 */}
            <p>리뷰: {review.content}</p> {/* 리뷰 내용 표시 */}
          </Card>
        ))}
      </CardContainer>
    </PageContainer>
  );
};

// MyPage 컴포넌트를 기본 내보내기
export default MyPage;