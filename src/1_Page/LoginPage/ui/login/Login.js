import React, { useEffect } from "react";
import { Container, Logo, LoginButton, MoveBtn } from "./style";
import { useNavigate } from "react-router-dom";
import { loadKakaoSdk } from "../../model/loadKakaoSDK";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loadKakaoSdk()
      .then(() => console.log("Kakao SDK가 초기화되었습니다."))
      .catch((error) => console.error("Kakao SDK 로드 오류:", error));
  }, []);

  const handleLogin = () => {
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log("로그인 성공", authObj);
          // 로그인 성공 후 페이지 이동
          navigate("/home"); // 로그인 성공 후 이동할 페이지 경로
        },
        fail: (err) => {
          console.error("로그인 실패", err);
        },
      });
    } else {
      console.error("Kakao SDK가 로드되지 않았습니다.");
    }
  };

  return (
    <Container>
      <Logo>511 BUSLIVE</Logo>
      <div>
        <Logo>카카오와 함께</Logo>
        {/* <MoveBtn onClick={() => {}}>로그인 없이 이용</MoveBtn> */}
        <LoginButton onClick={handleLogin}>카카오 로그인하기</LoginButton>
      </div>
    </Container>
  );
};

export default LoginPage;
