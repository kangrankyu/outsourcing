// custom hook
// 근데 이 로직 누구 쓸사람 있나용..??

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // fetchRestaurants: supabase에서 데이터를 가져오는 함수
    const fetchRestaurants = async () => {
      const { data } = await supabase.from('restaurants').select('*');
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return restaurants;
};

export default useFetchRestaurants;
