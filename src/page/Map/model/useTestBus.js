import { useState, useRef, useCallback } from "react";
import { nodeLocation } from "../../../entities/Bus/BusLocationData";

const SPEED = 10;
const FRAME_RATE = 100;

const useTestBus = () => {
  const [bus, setBus] = useState([]);
  const intervalRef = useRef(null);

  const setBusAdd = useCallback((data) => {
    const initializedBus = data.map((busLocation) => {
      const nextNode = getNextNode(busLocation);
      const angle = nextNode
        ? calculateAngle(
            { lat: busLocation.lat, lng: busLocation.lng },
            { lat: nextNode.lat, lng: nextNode.lng }
          )
        : 0;

      return {
        ...busLocation,
        angle,
      };
    });
    setBus(initializedBus);
  }, []);

  const resetBusData = useCallback(() => {
    setBus([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const moveBusEvent = useCallback(() => {
    if (intervalRef.current) return; // 중복 실행 방지

    intervalRef.current = setInterval(() => {
      setBus((prevBus) =>
        prevBus.map((busLocation) => {
          if (!busLocation) return busLocation;

          const nextNode = getNextNode(busLocation);
          if (!nextNode) return busLocation;

          const distance = getDistanceInMeters(
            busLocation.lat,
            busLocation.lng,
            nextNode.lat,
            nextNode.lng
          );

          if (distance < SPEED) {
            const nextAngle = getNextNode(nextNode)
              ? calculateAngle(
                  { lat: nextNode.lat, lng: nextNode.lng },
                  getNextNode(nextNode)
                )
              : 0;

            return {
              ...busLocation,
              lat: nextNode.lat,
              lng: nextNode.lng,
              lastNode: nextNode.lastNode,
              angle: nextAngle,
            };
          }

          const x = nextNode.lat - busLocation.lat;
          const y = nextNode.lng - busLocation.lng;
          const step = FRAME_RATE / (distance / SPEED) / 1000;

          return {
            ...busLocation,
            lat: busLocation.lat + x * step,
            lng: busLocation.lng + y * step,
          };
        })
      );
    }, FRAME_RATE);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return [bus, setBusAdd, resetBusData, moveBusEvent];
};

const getNextNode = (busLocation) => {
  const currentNodeIndex = nodeLocation.findIndex(
    (node) => node.lastNode === parseInt(busLocation.lastNode, 10)
  );
  return nodeLocation[(currentNodeIndex + 1) % nodeLocation.length];
};

const calculateAngle = (start, end) => {
  if (!start || !end) return 0;
  const deltaX = end.lng - start.lng;
  const deltaY = end.lat - start.lat;
  return Math.atan2(deltaY, deltaX);
};

const getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default useTestBus;
