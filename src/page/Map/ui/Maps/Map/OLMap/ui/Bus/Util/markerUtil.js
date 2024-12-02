import createBusFeature from "./CreateBusFeature";

export const updateMarkers = (bus, vectorSource) => {
  if (!bus?.length || !vectorSource) return;
  vectorSource.clear();
  bus.forEach(({ lat, lng, angle }) => {
    const feature = createBusFeature(lat, lng, angle);
    feature.setId(angle);
    vectorSource.addFeature(feature);
  });
};

export const addClosestBusMarker = (closestBus, vectorSource) => {
  if (!closestBus || !vectorSource) return;
  vectorSource.clear();
  const feature = createBusFeature(
    closestBus.lat,
    closestBus.lng,
    closestBus.angle,
    0.2,
    0.2
  );
  vectorSource.addFeature(feature);
};
