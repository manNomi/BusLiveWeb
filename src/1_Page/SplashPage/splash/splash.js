// SplashPage.js
import React, { useEffect } from "react";
import { SplashContainer, Logo, Tagline, LoadingIndicator, Box } from "./style";
import usePageChange from "../../Map/model/usePageChange";

const SplashPage = () => {
  const pageChange = usePageChange();

  useEffect(() => {
    const timer = setTimeout(() => {
      pageChange("/login");
    }, 3000);
    // Clean up timer if component unmounts before timeout
    return () => clearTimeout(timer);
  }, [pageChange]);
  return (
    <SplashContainer>
      <Box>
        <Logo>버스 라이브 511</Logo>
        <Tagline>실시간 서울 511번 버스 위치 추적</Tagline>
        <LoadingIndicator />
      </Box>
    </SplashContainer>
  );
};

export default SplashPage;
