import VectorLayer from "ol/layer/Vector";

export const initializeVectorLayer = (mapInstance, vectorSource) => {
  if (!mapInstance || !vectorSource) return null;

  const vectorLayer = new VectorLayer({ source: vectorSource });
  mapInstance.addLayer(vectorLayer);

  return () => {
    mapInstance.removeLayer(vectorLayer);
  };
};
