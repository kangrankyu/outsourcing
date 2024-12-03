
import { createClient } from '@supabase/supabase-js';
import ScrollToTopButton from '../component/ScrollToTopButton';
// import styled from 'styled-components';
import { useEffect, useState } from 'react';
import InfiniteScroll from '../component/InfiniteScroll';

function RestaurantsList() {
  const [cards, setCards] = useState([]);
  const [content, setConTent] = useState('');
  const [rating, setRating] = useState(0);

  // Supabase 클라이언트 생성
  const supabase = createClient(
    'https://kdszztcbvfcmmyihescu.supabase.co', // Supabase 프로젝트 URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3p6dGNidmZjbW15aWhlc2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NTkxMDcsImV4cCI6MjA0ODQzNTEwN30.McDkEK7_LJ7410e6qtGpK5lNT60RfUThHmDPO4PsIf0' // Supabase API 키
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('*').limit(20); // 초기값 20개만 가져오기

      if (error) {
        return alert(error.message);
      }
      setCards(data);
      console.log(data);
    };
    fetchRestaurants();
  }, []);

  const handleFeebackSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('reviews').insert({ name: rating, content }).select('*');
    if (error) {
      return alert(error.message);
    }
    setConTent([...content, ...data]);
  };

  const handleContentChange = (e) => {
    setConTent(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <>
      <div>restaurantsList</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifycontent: 'center' }}>
        {cards.map((card) => (
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
            {/* <p>{card.id}</p> */}
            <form onSubmit={handleFeebackSubmit}>
              <input type="number" value={rating} onChange={handleRatingChange} placeholder="🌟" />
              <input type="text" value={content} onChange={handleContentChange} placeholder="상세리뷰 입력하기"></input>
              <button>평점제출</button>
            </form>
          </div>
        ))}
        <InfiniteScroll />
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default RestaurantsList;

//버튼을 눌렀을떄 입력한평점과 코멘트를 데이터베이스에 연결해서 사용하기
