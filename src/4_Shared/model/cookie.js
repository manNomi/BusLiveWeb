// 쿠키 설정 함수
export const setCookie = (name, value, days = 7, path = "/") => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // 유효기간 설정 (기본 7일)
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax;`;
};

// 쿠키 가져오기 함수
export const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null; // 해당 쿠키가 없는 경우
};

// 쿠키 삭제 함수
export const deleteCookie = (name, path = "/") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; SameSite=Lax;`;
};

// 모든 쿠키 삭제 함수
export const clearAllCookies = () => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const cookieName = cookie.split("=")[0];
    deleteCookie(cookieName);
  }
};
