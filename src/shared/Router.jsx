import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantsList from '../page/RestaurantsList';
import StarRating from '../component/StarRating';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>홈</>} />
        <Route path="/login" element={<>로그인</>} />
        <Route path="/signup" element={<>회원가입</>} />
        <Route path="/mypage" element={<>마이페이지</>} />
        {/* <Route path="/restaurants/:id" element={<RestaurantsList />} /> */}
        <Route path="/StarRating" element={<StarRating />} />
        <Route path="/RestaurantsList" element={<RestaurantsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
