import React, { useEffect, useState } from "react";
import {
  ArrowButtonWrapper,
  ArrowButton,
  ButtonContainer,
  StyledButton,
} from "./style";
import useMapAPI from "../../../../../../shared/recoil/useMap";

const ButtonGroup = () => {
  const [map, setMap] = useMapAPI();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const buttons = ["Naver", "Google", "Kakao", "Default"];
  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : buttons.length - 1
    );
  };

  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prevIndex) =>
      prevIndex < buttons.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    setMap(buttons[activeIndex]);
  }, [activeIndex]);

  return (
    <ArrowButtonWrapper>
      <ArrowButton onClick={handlePrev}>{"<"}</ArrowButton>
      <ButtonContainer>
        {buttons.map((button, index) =>
          index === activeIndex ? (
            <StyledButton key={index} direction={direction} isActive>
              {button}
            </StyledButton>
          ) : null
        )}
      </ButtonContainer>
      <ArrowButton onClick={handleNext}>{">"}</ArrowButton>
    </ArrowButtonWrapper>
  );
};

export default ButtonGroup;
