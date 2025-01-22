import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "../../../4_Shared/model/cookie";

const KAKAO_SDK_URL = "https://developers.kakao.com/sdk/js/kakao.min.js";
const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

const useKakaoLogin = () => {
  const navigate = useNavigate();

  const loadKakaoSdk = useCallback(async () => {
    // 이미 초기화된 경우 반환
    if (window.Kakao?.isInitialized()) {
      return window.Kakao;
    }

    const existingScript = document.querySelector(
      `script[src="${KAKAO_SDK_URL}"]`
    );

    try {
      if (existingScript) {
        await new Promise((resolve) => (existingScript.onload = resolve));
      } else {
        await loadNewScript();
      }

      return window.Kakao || throwInitError();
    } catch (error) {
      console.error("Kakao SDK 로드 실패:", error);
      throw error;
    }
  }, []);

  const loadNewScript = () => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;

    script.onload = () => {
      window.Kakao?.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
    };

    document.head.appendChild(script);
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  };

  const refreshAccessToken = async (refreshToken) => {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
      refresh_token: refreshToken,
    });

    try {
      const response = await fetch(KAKAO_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      if (!response.ok) throw new Error("리프레시 토큰 요청 실패");

      const { access_token } = await response.json();
      console.log("새로운 액세스 토큰:", access_token);
      return access_token;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      throw error;
    }
  };

  const handleUserSession = async () => {
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    if (!accessToken) return;

    try {
      await authenticateUser(accessToken, refreshToken);
      navigate("/home");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const authenticateUser = async (accessToken, refreshToken) => {
    window.Kakao.Auth.setAccessToken(accessToken);

    try {
      await window.Kakao.API.request({ url: "/v2/user/me" });
    } catch (error) {
      if (!refreshToken) throw error;

      const newAccessToken = await refreshAccessToken(refreshToken);
      setCookie("access_token", newAccessToken, 7);
      window.Kakao.Auth.setAccessToken(newAccessToken);
      await window.Kakao.API.request({ url: "/v2/user/me" });
    }
  };

  const handleAuthError = (error) => {
    console.error("인증 오류:", error);
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  };

  const handleLogin = async () => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.log("Kakao SDK 초기화 중...");
      window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
    }

    try {
      const authObj = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: resolve,
          fail: reject,
        });
      });

      console.log("로그인 성공", authObj);
      setCookie("access_token", authObj.access_token, 7);
      navigate("/home");
    } catch (error) {
      console.error("카카오 로그인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const initializeKakao = async () => {
      try {
        await loadKakaoSdk();
        await handleUserSession();
      } catch (error) {
        console.error("Kakao SDK 초기화 실패:", error);
      }
    };

    initializeKakao();
  }, [navigate]);

  return { handleLogin };
};

const throwInitError = () => {
  throw new Error("Kakao SDK 초기화 실패");
};

export default useKakaoLogin;
