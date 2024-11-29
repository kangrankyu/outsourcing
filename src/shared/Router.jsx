import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>홈</>} />
                <Route path="/login" element={<>로그인</>} />
                <Route path="/signup" element={<>회원가입</>} />
                <Route path="/mypage" element={<>마이페이지</>} />
                <Route path="/restaurants/:id" element={<>상세 페이지</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;