import Map from "./Map";
import ChatPage from "./ChatPage";
import { Routes, Route } from "react-router-dom";
import ChatList from "./ChatListPage";
import LoginPage from "./LoginPage";
const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/home/:id?" element={<Map />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};
export default Page;
