import Style from "./style";
import { useEffect } from "react";

const Advertise = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Style.Ad>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-aaXkzCMAsuXVnnta"
        data-ad-width="100%"
        data-ad-height="100%"></ins>
    </Style.Ad>
  );
};

export default Advertise;
