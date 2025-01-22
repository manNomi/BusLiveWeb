import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useKakaoLogin = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Kakao SDK 로드 및 초기화 함수
  const loadKakaoSdk = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Kakao && window.Kakao.isInitialized()) {
        resolve(window.Kakao);
        return;
      }

      // 이미 스크립트가 추가되었는지 확인
      const existingScript = document.querySelector(
        'script[src="https://developers.kakao.com/sdk/js/kakao.min.js"]'
      );
      if (existingScript) {
        existingScript.onload = () => resolve(window.Kakao);
        return;
      }

      // 새로운 스크립트 추가
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
          resolve(window.Kakao);
        } else {
          reject(new Error("Kakao SDK 초기화 실패"));
        }
      };
      script.onerror = () => reject(new Error("Kakao SDK 로드 실패"));
      document.head.appendChild(script);
    });
  }, []);

  // Kakao SDK 로드 및 초기화
  useEffect(() => {
    loadKakaoSdk()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(false);
      });
  }, [loadKakaoSdk]);

  // 카카오 로그인 함수
  const handleLogin = useCallback(() => {
    if (!isLoaded || !window.Kakao) {
      console.error("Kakao SDK가 아직 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log("로그인 성공", authObj);
        navigate("/home");
      },
      fail: (err) => {
        console.error("로그인 실패", err);
      },
    });
  }, [isLoaded, navigate]);

  return { handleLogin, isLoaded };
};

export default useKakaoLogin;
