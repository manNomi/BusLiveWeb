import React from "react";
import STYLE from "./style";
import useKakaoLogin from "./model/useKakaoLogin";

const LoginPage = () => {
  const { handleLogin } = useKakaoLogin();

  return (
    <STYLE.Container>
      <STYLE.ContentWrapper>
        <STYLE.GlassBox>
          <STYLE.Title>LIVE BUS</STYLE.Title>
          <STYLE.SocialLoginContainer>
            <STYLE.KakaoButton onClick={handleLogin}>
              카카오 로그인
            </STYLE.KakaoButton>
          </STYLE.SocialLoginContainer>
        </STYLE.GlassBox>
      </STYLE.ContentWrapper>
    </STYLE.Container>
  );
};

export default LoginPage;
