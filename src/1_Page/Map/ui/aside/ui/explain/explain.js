import { useParams } from "react-router-dom";
import Busicon from "../../../../assets/BusIcon";
import Style from "./style";
import { useEffect, useState } from "react";
const Explain = () => {
  const { id } = useParams();
  const [paramState, setParam] = useState();
  useEffect(() => {
    setParam(id);
  }, [id]);
  return (
    paramState && (
      <Style.Container>
        <Style.Box>
          <Busicon color={1} width={40} height={40} />
          <Style.Text>혼잡</Style.Text>
        </Style.Box>
        <Style.Box>
          <Busicon color={2} width={40} height={40} />
          <Style.Text>보통</Style.Text>
        </Style.Box>
        <Style.Box>
          <Busicon color={3} width={40} height={40} />
          <Style.Text>적음</Style.Text>
        </Style.Box>
      </Style.Container>
    )
  );
};

export default Explain;
