import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import Singup from "../page/Singup";
import MyPage from "../page/myPage";
import RestaurantsList from "../page/restaurantsList";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Singup />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/restaurants/:id" element={<RestaurantsList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;