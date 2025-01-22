const testBusData = () => {
  const nodes = {
    data: [
      {
        lastNode: 0,
        lat: 37.4478052441598,
        lng: 126.646296789041,
        congestion: 1,
        lastbusyn: 1,
      },
      {
        lastNode: 3,
        lat: 37.4460269045282,
        lng: 126.643593618829,
        congestion: 2,
        lastbusyn: 0,
      },
      {
        lastNode: 15,
        lat: 37.4503492910096,
        lng: 126.659916449765,
        congestion: 1,
        lastbusyn: 0,
      },
      {
        lastNode: 27,
        lat: 37.4587371703138,
        lng: 126.676210388807,
        congestion: 1,
        lastbusyn: 0,
      },
      {
        lastNode: 36,
        lat: 37.4641711732054,
        lng: 126.677968529141,
        congestion: 3,
        lastbusyn: 0,
      },
      {
        lastNode: 49,
        lat: 37.4514650937186,
        lng: 126.667223935426,
        congestion: 3,
        lastbusyn: 1,
      },
    ],
  };
  return nodes;
};

// 버스 데이터를 가져오는 비동기 함수
const getBusTestData = async () => {
  const data = testBusData();
  return data;
};

export default getBusTestData;
