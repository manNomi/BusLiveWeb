import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../../../4_Shared/model/cookie";

const useKakaoLogin = () => {
  const navigate = useNavigate();
  const loadKakaoSdk = useCallback(async () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      return window.Kakao;
    }

    // 이미 스크립트가 추가되었는지 확인
    const existingScript = document.querySelector(
      'script[src="https://developers.kakao.com/sdk/js/kakao.min.js"]'
    );

    if (existingScript) {
      await new Promise((resolve) => (existingScript.onload = resolve));
    } else {
      // 새로운 스크립트 추가
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;

      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
        }
      };
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    if (window.Kakao) {
      return window.Kakao;
    } else {
      throw new Error("Kakao SDK 초기화 실패");
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.REACT_APP_KAKAO_CLIENT_ID);
    params.append("refresh_token", refreshToken);

    try {
      const response = await fetch(KAKAO_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!response.ok) {
        throw new Error("리프레시 토큰 요청 실패");
      }

      const data = await response.json();
      console.log("새로운 액세스 토큰:", data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeKakao = async () => {
      try {
        await loadKakaoSdk();

        const accessToken = getCookie("access_token");
        const refreshToken = getCookie("refresh_token");

        if (accessToken) {
          window.Kakao.Auth.setAccessToken(accessToken);

          try {
            const response = await window.Kakao.API.request({
              url: "/v2/user/me",
            });
            console.log("자동 로그인 성공 (새 토큰 이용):", response);
            navigate("/home");
          } catch (error) {
            if (refreshToken) {
              try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                setCookie("access_token", newAccessToken, 7);
                window.Kakao.Auth.setAccessToken(newAccessToken);
                const retryResponse = await window.Kakao.API.request({
                  url: "/v2/user/me",
                });
                navigate("/home");
              } catch (refreshError) {
                console.error("리프레시 토큰 만료 또는 오류:", refreshError);
                deleteCookie("access_token");
                deleteCookie("refresh_token");
              }
            } else {
              deleteCookie("access_token");
            }
          }
        }
      } catch (error) {
        console.error("Kakao SDK 로드 오류:", error);
      }
    };

    initializeKakao();
  }, [navigate]);
  // 카카오 로그인 함수
  const handleLogin = useCallback(() => {
    if (!window.Kakao) {
      return;
    }
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log("로그인 성공", authObj);
        setCookie("access_token", authObj.access_token);
        setCookie("refresh_token", authObj.access_token);
        navigate("/home");
      },
      fail: (err) => {
        console.error("로그인 실패", err);
      },
    });
  }, [navigate]);

  return { handleLogin };
};

export default useKakaoLogin;
