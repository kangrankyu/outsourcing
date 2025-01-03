import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import MyPage from '../page/MyPage';
import Community from '../page/Community';
import CreatePost from '../page/CreatePost';
import Signup from '../page/Signup';
import Layout from '../components/layout/Layout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/restaurants/:id" element={<Community />} />
        <Route path="/community" element={<Community />} />
        <Route path="/createpost" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
