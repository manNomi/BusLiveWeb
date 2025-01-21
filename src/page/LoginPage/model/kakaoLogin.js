// loadKakaoSdk.js
export const loadKakaoSdk = () => {
  return new Promise((resolve, reject) => {
    if (window.Kakao) {
      resolve(window.Kakao);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);
        resolve(window.Kakao);
      } else {
        reject(new Error("Kakao SDK 로드에 실패했습니다."));
      }
    };
    script.onerror = () =>
      reject(new Error("Kakao SDK 스크립트 로드에 실패했습니다."));
    document.head.appendChild(script);
  });
};
