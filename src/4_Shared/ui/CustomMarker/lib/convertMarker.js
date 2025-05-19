import ReactDOMServer from "react-dom/server";

export const convertMarker = (color, Icon, width, height) => {
  return ReactDOMServer.renderToString(
    <Icon color={color} width={width} height={height} />
  );
};
