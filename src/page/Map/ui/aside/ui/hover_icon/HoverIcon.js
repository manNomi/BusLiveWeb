import { Container, Box, Icon, IconWrap } from "./style";

const HoverIcon = ({ resource, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Box>
        <IconWrap>
          <Icon as={resource} />
        </IconWrap>
      </Box>
    </Container>
  );
};
export default HoverIcon;
