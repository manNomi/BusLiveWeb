import { Routes, Route, Navigate } from "react-router-dom";

import MapPage from "./MapPage";
import ChatPage from "./ChatPage";
import ChatList from "./ChatListPage";
import LoginPage from "./LoginPage";
const Page = () => {
  return (
    <>
      <Routes>
        <Route path="/home/:id?" element={<MapPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
export default Page;
