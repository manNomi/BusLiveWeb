import STYLE from "./style";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <STYLE.Container>
      <STYLE.ContentWrapper>
        <STYLE.GlassBox>
          <STYLE.Title>LIVE BUS</STYLE.Title>
          <STYLE.SocialLoginContainer>
            <STYLE.KakaoButton
              onClick={
                () => navigate("/map") // 로그인 없이 이동
              }>
              로그인 없이 이용하세요 ~
            </STYLE.KakaoButton>
          </STYLE.SocialLoginContainer>
        </STYLE.GlassBox>
      </STYLE.ContentWrapper>
    </STYLE.Container>
  );
};

export default LoginPage;
