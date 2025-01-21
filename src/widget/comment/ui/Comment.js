import {
  Container,
  UserBox,
  UserImgBox,
  UserImg,
  Box,
  UserText,
  TextBold,
  Text,
  Content,
  IconBox,
  Icon,
  IconText,
  SettingBox,
  SettingIcon,
  IconWrap,
} from "./style.js";
import { setDate, setNumber } from "../../../shared/setNumber/setNumber.js";

import { useTheme } from "styled-components";

const Comment = (props) => {
  const { userImg, content, userName, like, dislike, date } = props;

  const theme = useTheme();
  return (
    <Container>
      <UserBox>
        <UserImgBox>
          <UserImg src={userImg} />
        </UserImgBox>
        <Box>
          <UserText>
            <TextBold>{userName}</TextBold>
            <Text>{setDate(date)}</Text>
          </UserText>
          <Content>{content}</Content>
          <IconBox>
            <IconWrap>
              <Icon as={theme.icons.like}></Icon>
            </IconWrap>
            <Text>{setNumber(like)}</Text>
            <IconWrap>
              <Icon as={theme.icons.dislike}></Icon>
            </IconWrap>
            <IconText>답글</IconText>
          </IconBox>
        </Box>
      </UserBox>
      <SettingBox>
        <SettingIcon src={theme.icons.setting}></SettingIcon>
      </SettingBox>
    </Container>
  );
};

export default Comment;
