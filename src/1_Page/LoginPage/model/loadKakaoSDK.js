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
        window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID); // 발급받은 키 사용
        resolve(window.Kakao);
      } else {
        reject("Kakao SDK 로드 실패");
      }
    };
    script.onerror = () => reject("Kakao SDK 스크립트 로드 실패");
    document.head.appendChild(script);
  });
};
