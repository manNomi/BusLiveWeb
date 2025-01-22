import React, { useEffect } from "react";
import STYLE from "./style";
import { useNavigate } from "react-router-dom";
import { loadKakaoSdk } from "./model/loadKakaoSDK";

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
          navigate("/home");
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
    <STYLE.Container>
      <STYLE.ContentWrapper>
        <STYLE.GlassBox>
          <STYLE.Title>LIVE BUS</STYLE.Title>
          <STYLE.SocialLoginContainer>
            <STYLE.KakaoButton>카카오 로그인</STYLE.KakaoButton>
          </STYLE.SocialLoginContainer>
        </STYLE.GlassBox>
      </STYLE.ContentWrapper>
    </STYLE.Container>
  );
};

export default LoginPage;
