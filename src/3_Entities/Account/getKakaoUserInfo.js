import { getCookie } from "../../4_Shared/model/cookie";

const getKakaoUserInfo = async () => {
  try {
    const accessToken = getCookie("accessToken");
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user info");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("카카오 사용자 정보 요청 오류:", error);
  }
};
export default getKakaoUserInfo;
