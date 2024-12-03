import { useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
  }, [inView, hasNextPage, fetchNextPage]); // 의존성 배열

  // 로딩 중일 때 표시할 내용
  if (isLoading) return <div>Loading...</div>;
  // 에러가 발생했을 때 표시할 내용
  if (isError) return <div>Error loading posts</div>;

  // 데이터가 로딩되었을 때의 UI 구성
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifycontent: 'center' }}>
        {data.pages.flat().map((card) => (
          <div
            key={card.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              margin: '10px',
              padding: '10px',
              width: 'calc(33% - 20px)'
            }}
          >
            <h2>{card.name}</h2>
            <p>{card.address}</p>
            <p>{card.tel}</p>
            {/* <p>{card.latitude}</p>
            <p>{card.longitude}</p> */}
            <input placeholder="🌟" />
            <input placeholder="상세리뷰 입력하기" />
            <button>평점제출</button>
          </div>
        ))}
      </div>

      <div ref={ref} style={{ height: '20px' }} />
      {!hasNextPage && <div>더 이상 데이터가 없습니다.</div>}
    </div>
  );
};

export default InfiniteScroll;


