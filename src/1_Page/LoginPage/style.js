import styled, { keyframes } from "styled-components";

const shine = keyframes`
  from {
    background-position: 200% center;
  }
  to {
    background-position: -200% center;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const spinSlow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0a0a0f 0%, #1f1f3a 100%);
    font-family: "Pretendard", sans-serif;
    color: white;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      background: conic-gradient(
        from 0deg,
        rgba(128, 90, 213, 0.1),
        rgba(76, 213, 213, 0.1),
        rgba(128, 90, 213, 0.1)
      );
      animation: ${spinSlow} 8s linear infinite;
      top: -50%;
      left: -50%;
    }
  `,

  ContentWrapper: styled.div`
    position: relative;
    z-index: 1;
    animation: ${float} 6s ease-in-out infinite;
  `,

  GlassBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5rem;
    border-radius: 2rem;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    max-width: 420px;
    width: 90%;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      transform: scale(1.02);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
  `,

  Title: styled.h1`
    font-size: 3rem;
    width: 100%;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 8px;
    background: linear-gradient(90deg, #ff6b6b, #cc6dff, #4d9fff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shine} 3s linear infinite;
    margin-bottom: 2rem;
    text-shadow: 0 0 20px rgba(204, 109, 255, 0.5);

    @media (max-width: 768px) {
      font-size: 3rem;
      letter-spacing: 5px;
    }

    @media (max-width: 480px) {
      font-size: 2.5rem;
      letter-spacing: 3px;
    }
  `,

  MainButton: styled.button`
    width: 100%;
    padding: 1.2rem 2rem;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: white;
    background: linear-gradient(90deg, #7928ca, #ff0080);
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(121, 40, 202, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  SocialLoginContainer: styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  `,

  KakaoButton: styled.button`
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    background: #fee500;
    opacity: 70%;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(254, 229, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  AppleButton: styled.button`
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: black;
    background: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  `,
};

export default STYLE;
