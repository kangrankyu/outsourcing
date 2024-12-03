// 일단 그냥 fetch 쓰자! 근데 우리 axios 안쓰기로했던가???? 기억못함ㅋㅋ
// 우리가 쓸 db없으니까 임시로 이것만 테스트해보자고.. 100개만

import { useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://openapi.seoul.go.kr:8088/67714845456f766535384e506c504b/json/LOCALDATA_072404/1/150/`
        );
        const data = await response.json();

        if (data.LOCALDATA_072404 && data.LOCALDATA_072404.row) {
          // 필요한 데이터만 필터링
          const filteredData = data.LOCALDATA_072404.row.map((restaurant) => ({
            name: restaurant.BPLCNM,
            address: restaurant.RDNWHLADDR,
            tel: restaurant.SITETEL
          }));

          // Supabase에 데이터 삽입
          filteredData.forEach((restaurant) => {
            insertData(restaurant);
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const insertData = async (restaurant) => {
    const { error } = await supabase.from('restaurants').insert([
      {
        name: restaurant.name,
        address: restaurant.address,
        tel: restaurant.tel
      }
    ]);
    if (error) {
      console.error('Error inserting data:', error);
    }
  };
  return null;
};

export default Test;

// TODO
// 1. 나중에 Test.jsx 그냥 삭제할 예정